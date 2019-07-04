#!/usr/bin/env sh
echo 'Creating deployable "Dockerrun.aws.json" file.'
read -r -d '' __json << EOM
{
  "AWSEBDockerrunVersion": 2,
  "containerDefinitions": [
    {
      "name": "fibonacci-client",
      "image": "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/fibonacci-client:${IMAGE_TAG}",
      "hostname": "client",
      "memory": 512
    },
    {
      "name": "fibonacci-api",
      "image": "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/fibonacci-api:${IMAGE_TAG}",
      "hostname": "api",
      "memory": 512
    },
    {
      "name": "fibonacci-worker",
      "image": "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/fibonacci-worker:${IMAGE_TAG}",
      "memory": 512
    },
    {
      "name": "fibonacci-router",
      "image": "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/fibonacci-router:${IMAGE_TAG}",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 80,
          "hostPort": 80
        }
      ],
      "links": ["fibonacci-client", "fibonacci-api"],
      "memory": 512
    }
  ]
}
EOM
mkdir -p build
echo ${__json} > build/Dockerrun.aws.json