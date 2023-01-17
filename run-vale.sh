#!/bin/bash

list=""
alertLevel=$1

if [ ${#alertLevel} -eq 0 ]; then
  alertLevel="error"
fi

# get directories in content other than reference
for i in `find src/pages -type d -maxdepth 1`
do
  if [ ${#list} -gt 0 ]; then
    list+=' '
  fi
  list+="$i"
done
#get files in content (not nested)
for i in `find src/pages -type f -maxdepth 1`
do
  if [ ${#list} -gt 0 ]; then
    list+=' '
  fi
  list+="$i"
done

exec vale $list --minAlertLevel $alertLevel
