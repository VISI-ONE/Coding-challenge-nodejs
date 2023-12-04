FROM node:18-alpine
RUN npm install nodemon -g
RUN npm install -g typescript ts-node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
