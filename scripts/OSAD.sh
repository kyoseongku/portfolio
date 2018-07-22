#! /bin/bash

go build -o OSAD functions/OSAD.go && ./OSAD; rm OSAD;
