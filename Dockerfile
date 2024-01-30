FROM node:16.17.0-bullseye-slim
workdir /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --only=production

ENV NODE_ENV=production

COPY . .

CMD ["node", "src/index.js"]
