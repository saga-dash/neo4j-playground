#include .env
#export $(shell sed 's/=.*//' .env)
IMAGE_NAME=neo4j-playground

neo4j:
	docker run --rm --init -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=none --env-file .env -v $(PWD)/shared/neo4j:/data neo4j:4.1

build:
	docker build -t ${IMAGE_NAME} .
run:
	docker run --rm --init --env-file=.env ${IMAGE_NAME} npm run start
run_ts:
	docker run --rm --init -v $(PWD):$(PWD) -w $(PWD) --env-file=.env ${IMAGE_NAME} npm run start:ts
