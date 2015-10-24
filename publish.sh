#!/bin/bash
git checkout master;
git pull;
if [ "$V_ENV" = "PRO" ]; then
    git checkout production;
else
    git checkout test;
fi
git rebase master;
npm run production;
node upload.js;
cd ../vokou;
git pull;
cp ../vokou-web/build/index-pro.html public/index.html;
parse deploy;
cd ../vokou-web;
git checkout master;