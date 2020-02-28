FROM node:12.16.1-alpine3.11

RUN mkdir /app
WORKDIR /app

ENTRYPOINT /bin/sh