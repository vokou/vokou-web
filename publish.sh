#!/bin/bash
if [ "$V_ENV" = "PRO" ]; then
    git checkout master;
    git pull;
    git checkout production;
    git rebase master;
else
    git checkout master;
    git pull;
    git checkout test;
    git rebase master;
fi
npm run production;
node upload.js
