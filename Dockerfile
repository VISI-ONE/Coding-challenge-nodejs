FROM node:21-bookworm-slim

ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app

RUN apt-get update && apt-get install -y \
    dumb-init \
    make \
    && rm -rf /var/lib/apt/lists/* 


COPY package*.json ./
COPY . .

RUN npm install 

EXPOSE 8080

# Define the command to run the app
CMD ["dumb-init", "node", "src/app.js" ]