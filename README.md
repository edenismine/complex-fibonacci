# EKS CI/CS Proof of Concept

A simple proof of concept using a react application backed by redis, postgres and an NGINX router. Deployed using docker, kubernetes and AWS's EKS.

<img src="https://codebuild.us-east-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiWjkvaEZQZFZZbGw5dHI4L0pFNlNXZUR3UngwVWZaNU1rVmY0QWtKTDRpb3R2b3Z0c1MyRU9QSXFleVJHMXFSQWdUSmdwUFBoQ2lzUEUxbzdLQ1kxN2VvPSIsIml2UGFyYW1ldGVyU3BlYyI6IlZiTEJGQnl5N2s3ZDl3eXMiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master"/>

## Environment variables

The following environment variables need to be set at runtime.

Worker and API server:
- REDIS_HOST url
- REDIS_PORT integer

API server:
- PG_HOST url
- PG_DATABASE string
- PG_PORT integer
- PG_USER string
- PG_PASSWORD string

API server and router:
- API_PORT integer
- CLIENT_PORT integer

The following variables need to be set at buildtime.

Worker, API server and client:
- CI boolean

If pushing to ECR using CodeBuild, the following variables should be set:
- AWS_ACCOUNT_ID string
- IMAGE_TAG string
- Plus the default AWS environment variables ($AWS_...).