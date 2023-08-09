#!/bin/bash

docker run --name ragnaDB -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql
