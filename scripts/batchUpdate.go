package main

import (
  "fmt"

  "github.com/aws/aws-sdk-go/aws"
  "github.com/aws/aws-sdk-go/aws/session"
  "github.com/aws/aws-sdk-go/service/dynamodb"
  "github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type Entry struct {
  Date        int
  Start       float64
  End         float64
  Owner       string
  Project     string
  Performance int
}

var (
  dynamo *dynamodb.DynamoDB
)



func scan(
  exclusiveStartKey map[string]*dynamodb.AttributeValue,
) (
  []Entry,
  map[string]*dynamodb.AttributeValue,
  error,
) {
  scanArgs := &dynamodb.ScanInput{
    TableName: aws.String("WorkLog"),
    Limit: aws.Int64(100),
  }
  if len(exclusiveStartKey) != 0 {
    scanArgs.ExclusiveStartKey = exclusiveStartKey
  }

  result, err := dynamo.Scan(scanArgs)
  if err != nil {
    return []Entry{}, map[string]*dynamodb.AttributeValue{}, err
  }
  entries := make([]Entry, int(*result.Count))
  if err := dynamodbattribute.UnmarshalListOfMaps(result.Items, &entries); err != nil {
    return []Entry{}, map[string]*dynamodb.AttributeValue{}, err
  }

  for i, _ := range entries {
    entries[i].Owner = "SCH"
  }

  return entries, result.LastEvaluatedKey, nil
}



func main() {
  awsSession, err := session.NewSession(&aws.Config{
    Region: aws.String("us-west-2"),
  })
  if err != nil {
    fmt.Println(err)
    return
  }
  dynamo = dynamodb.New(awsSession)

  allEntries := [][]Entry{}
  entries, exclusiveStartKey, err := scan(map[string]*dynamodb.AttributeValue{})
  if err != nil {
    fmt.Println(err)
    return
  }
  allEntries = append(allEntries, entries)
  fmt.Printf("Got %d entries\n", len(entries))
  for len(exclusiveStartKey) > 0 {
    entries, exclusiveStartKey, err = scan(exclusiveStartKey)
    if err != nil {
      fmt.Println(err)
      return
    }
    allEntries = append(allEntries, entries)
    fmt.Printf("Got %d entries\n", len(entries))
  }

  fmt.Println("Done")
}
