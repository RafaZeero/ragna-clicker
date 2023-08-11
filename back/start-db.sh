#!/bin/bash

docker run --name ragnaDB -p 3308:3308 -e MYSQL_ROOT_PASSWORD=password mysql
