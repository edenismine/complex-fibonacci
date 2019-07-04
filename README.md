# EKS CI/CS Proof of Concept

A simple proof of concept using a react application backed by redis, postgres and an NGINX router. Deployed using docker, kubernetes and AWS's EKS.

<img src="https://codebuild.us-east-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiWjkvaEZQZFZZbGw5dHI4L0pFNlNXZUR3UngwVWZaNU1rVmY0QWtKTDRpb3R2b3Z0c1MyRU9QSXFleVJHMXFSQWdUSmdwUFBoQ2lzUEUxbzdLQ1kxN2VvPSIsIml2UGFyYW1ldGVyU3BlYyI6IlZiTEJGQnl5N2s3ZDl3eXMiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master"/>

## Environment variables

The following environment variables need to be set at runtime:
- REDIS_HOST
- REDIS_PORT
- PG_HOST
- PG_DATABASE
- PG_PORT
- PG_USER
- PG_PASSWORD

In addition to the previous variables, the following variables need to be set at buildtime:
- CI
- AWS_ACCOUNT_ID
- IMAGE_TAG

Plus the default AWS environment variables ($AWS_...).