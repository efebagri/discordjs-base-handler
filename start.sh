#!/bin/bash

#
# User: efebagri
# Date/Time: 2/12/24, 2:57 AM
# File: start.sh
#
# Modified: 1/9/24, 2:40 PM
#
# Copyright (c) 2023-2024 Exbil (https://www.exbil.net/)
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
