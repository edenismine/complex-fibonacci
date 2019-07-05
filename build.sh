#!/usr/bin/env bash
# Los docker build commands pasan la variable de entorno CI (configurada desde fuera) para avisar a nuestro código que está dentro de
# un CI server y pueda reaccionar a tal ambiente. La variable IMAGE_TAG también es configurada desde fuera.
echo Build started on `date`
echo Building the fibonacci-client image...   
docker build --build-arg CI -t fibonacci-client:$IMAGE_TAG client
docker tag fibonacci-client:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/fibonacci-client:$IMAGE_TAG
echo Building the fibonacci-api image...   
docker build --build-arg CI -t fibonacci-api:$IMAGE_TAG api
docker tag fibonacci-api:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/fibonacci-api:$IMAGE_TAG
echo Building the fibonacci-worker image...
docker build --build-arg CI -t fibonacci-worker:$IMAGE_TAG worker
docker tag fibonacci-worker:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/fibonacci-worker:$IMAGE_TAG
echo Building the fibonacci-router image...   
docker build --build-arg CI -t fibonacci-router:$IMAGE_TAG router
docker tag fibonacci-router:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/fibonacci-router:$IMAGE_TAG