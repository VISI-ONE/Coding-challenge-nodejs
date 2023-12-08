# Stage 1: Build Stage
FROM node:14 AS build

WORKDIR /app

COPY . .

RUN npm install

RUN make init-db

# Stage 2: Final Stage
FROM node:14

WORKDIR /app

COPY --from=build /app .

EXPOSE 3000

CMD ["npm", "start"]