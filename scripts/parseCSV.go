package main

import (
  "encoding/csv"
  "fmt"
  "io/ioutil"
  "os"
  "strconv"
  "strings"

  "github.com/aws/aws-sdk-go/aws"
  "github.com/aws/aws-sdk-go/aws/session"
  "github.com/aws/aws-sdk-go/service/dynamodb"
  "github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type Entry struct {
  Date        int
  Start       float64
  End         float64
  Employer    string
  IsRemote    bool
  Minutes     float64
  Project     string
  Performance int
}



func exists(arr []string, val string) bool {
  for _, a := range arr {
    if a == val {
      return true
    }
  }
  return false
}



func readFile(name, year string) ([]Entry, error) {
  file, err := os.Open(name)
  if err != nil {
    return []Entry{}, err
  }
  defer file.Close()

  lines, err := csv.NewReader(file).ReadAll()
  if err != nil {
    return []Entry{}, err
  }
  entries := make([]Entry, len(lines))

  var currentDate, month, day string
  for i, line := range lines {
    if line[0] != "" {
      month = strings.Split(line[0], "/")[0]
      day = strings.Split(line[0], "/")[1]
      if len(month) == 1 {
        month = "0"+month
      }
      if len(day) == 1 {
        day = "0"+day
      }
      currentDate = year+month+day
    }

    date, _ := strconv.Atoi(currentDate)
    start, _ := strconv.ParseFloat(line[1], 64)
    end, _ := strconv.ParseFloat(line[2], 64)
    min, _ := strconv.ParseFloat(line[3], 64)
    perf, _ := strconv.Atoi(line[6])

    entries[i] = Entry{
      Date: date,
      Start: start,
      End: end,
      Employer: "SuperCare Health",
      IsRemote: len(line) > 7 && line[7] == "REMOTE",
      Minutes: min,
      Project: line[4],
      Performance: perf,
    }
  }

  return entries, nil
}



func main() {
  var err error

  basePath := "./src/constants/worklogCSV/"
  files, err := ioutil.ReadDir(basePath)
  if err != nil {
    fmt.Println(err)
    return
  }

  data := make([][]Entry, len(files))
  total := 0

  for i, file := range files {
    fmt.Println("Reading", file.Name())
    data[i], err = readFile(basePath+file.Name(), "20"+strings.Split(file.Name(), "%2F")[1][:2])
    if err != nil {
      fmt.Println(err)
      return
    }
    total += len(data[i])
  }
  fmt.Printf("Read %d total entries\n", total)

  projects := []string{}
  for _, d := range data {
    for _, dd := range d {
      if !exists(projects, dd.Project) {
        projects = append(projects, dd.Project)
      }
    }
  }
  fmt.Printf("%d projects found: %v\n", len(projects), projects)

  fmt.Println("Formatting data for DB")
  awsSession, err := session.NewSession(&aws.Config{
    Region: aws.String("us-west-2"),
  })
  if err != nil {
    fmt.Println(err)
    return
  }
  dynamo := dynamodb.New(awsSession)
  dataDB := make([]*dynamodb.WriteRequest, total)
  c := 0
  for _, d := range data {
    for _, dd := range d {
      arg, err := dynamodbattribute.MarshalMap(dd)
      if err != nil {
        fmt.Println(err)
        return
      }
      dataDB[c] = &dynamodb.WriteRequest{
        PutRequest: &dynamodb.PutRequest{
          Item: arg,
        },
      }
      c++
    }
  }

  fmt.Println("Starting DB writes")
  c = 0
  for c < total {
    req := make(map[string][]*dynamodb.WriteRequest)
    if c+25 < total {
      req = map[string][]*dynamodb.WriteRequest{
        "WorkLog": dataDB[c:c+25],
      }
    } else {
      req = map[string][]*dynamodb.WriteRequest{
        "WorkLog": dataDB[c:],
      }
    }
    _, err = dynamo.BatchWriteItem(&dynamodb.BatchWriteItemInput{
      RequestItems: req,
    })
    if err != nil {
      fmt.Println(err)
      return
    }
    c += 25
    fmt.Println("Wrote", c)
  }

  fmt.Println("Done")
}
