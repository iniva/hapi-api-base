#!/bin/sh
docker-compose exec $1 sh -c "$2"
