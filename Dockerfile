# syntax=docker/dockerfile:1

FROM node:16.14.2

ENV NODE_ENV=production

WORKDIR /dockerapp

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "server.js" ]

