# Henlo world

I do a demonstrate of my work

[Do a viewing](https://www.kyoseong.com)

## TODO

* OCR/getUserMedia on iOS mobile
* Transfer files in S3
* Update resume PDF

## Notes

AWS CLI stuff need to be done on EC2

## Usage

#### Optimal string alignment distance using Damerau–Levenshtein distance algorithm

```
// Sample request
curl
  -X POST
  -H "Content-Type: application/json"
  -d '{
        "strings": [
          "I am one sentence",
          "I am another sentence"
        ]
      }'
  https://ey6mippnqc.execute-api.us-west-2.amazonaws.com/1/osad

// Sample response
{
  result: 5 // Remove the 5 chracters a, o, t, h, r, from "another" in the second string
}
```
