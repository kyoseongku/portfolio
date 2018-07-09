#! /bin/bash

go build -o batchUpdate scripts/batchUpdate.go && ./batchUpdate && rm batchUpdate
