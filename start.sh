#!/bin/bash

#
# User: efeba
# Date/Time: 3/15/23, 4:44 PM
# File: start.sh
#
# Modified: 3/3/23, 8:11 PM
#
# Copyright (c) 2023 BindYourServer (https://bindyourserver.com)
#    All rights Reserved.
#

if [ -d "./node_modules/" ]; then
  npm start
fi

if [ ! -d "./node_modules/"  ]; then
  echo "Dependencies Not Found, Installing..."
  npm install
  npm start
fi