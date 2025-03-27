#!/bin/bash

if [ -d "./node_modules/" ]; then
  npm start
fi

if [ ! -d "./node_modules/"  ]; then
  echo "Dependencies Not Found, Installing..."
  npm install
  npm start
fi
