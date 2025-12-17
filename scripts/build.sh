#!/bin/bash

SERVICES="gateway nginx auth user appointment"

mkdir -p ../deploy/images

for svc in $SERVICES; do
    docker image tag backend-$svc uby0/backend-$svc
    docker save uby0/backend-$svc -o ../deploy/images/$svc.tar
done
echo "Build completed."
