#! /bin/bash

go build -o parseCSV scripts/parseCSV.go && ./parseCSV && rm parseCSV
