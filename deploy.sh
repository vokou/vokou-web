#!/bin/bash
if [ "$1" = "production" ]; then
    if [ "$2" = "-v" ]; then
        V_ENV=PRO TS=`date +%s` UV=T ./publish.sh
    else
        V_ENV=PRO TS=`date +%s` ./publish.sh
    fi
elif [ "$1" = "test" ]; then
    if [ "$2" = "-v" ]; then
        TS=`date +%s` UV=T ./publish.sh
    else
        TS=`date +%s` ./publish.sh
    fi
else
    echo "Please indicate test or production to deploy"
fi
