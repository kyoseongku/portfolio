#! /bin/bash

go build -o fiddle scripts/fiddle.go &&
./fiddle &&
rm fiddle;
