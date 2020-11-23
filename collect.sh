#!/bin/bash

docker build -t genius_parser .
docker tag genius_parser 23792803/genius_parser
docker push 23792803/genius_parser
docker-compose up -d
tail -f /srv/logs/genius_parser/log.txt