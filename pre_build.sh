#!/usr/bin/env bash
echo 'Logging in to Amazon ECR...'
$(aws ecr get-login --no-include-email --region $AWS_DEFAULT_REGION)