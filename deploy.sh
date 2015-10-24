#!/bin/bash
if [ "$1" = "production" ]; then
    V_ENV=PRO ./publish.sh
elif [ "$1" = "test" ]; then
    ./publish.sh
else
    echo "Please indicate test or production to deploy"
fi
