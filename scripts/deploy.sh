#!/bin/bash

# Only deploy services that have been built
SERVICES="gateway nginx auth user appointment"

for svc in $SERVICES; do
    microk8s ctr image import ./deploy/images/$svc.tar
    microk8s.helm upgrade --install $svc-release ./deploy/k8s/chart/ -f ./deploy/k8s/services/$svc/$svc-values.yaml
done
echo "Deployment completed." 
 