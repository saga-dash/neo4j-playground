FROM node:12.16

COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build
