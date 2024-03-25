FROM node:20-alpine

RUN apk update && apk add --no-cache gcc libc-dev g++ python3 py3-pip make
RUN npm install -g npm node-gyp

RUN apk add postgresql-client

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["make", "init-app"]