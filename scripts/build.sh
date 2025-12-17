#!/bin/bash

SERVICES="gateway nginx auth user appointment"

mkdir -p ./deploy/images

for svc in $SERVICES; do
    docker image tag backend-$svc:latest uby0/backend-$svc:latest
    docker save uby0/backend-$svc:latest -o ./deploy/images/$svc.tar
done
echo "Build completed."
