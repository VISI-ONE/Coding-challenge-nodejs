FROM node:latest
WORKDIR /home/node/app
COPY . .
RUN npm install
RUN npx knex migrate:latest && npx knex seed:run
CMD npm start