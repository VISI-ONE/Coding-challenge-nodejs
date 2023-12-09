# Setup
FROM node:alpine
WORKDIR /usr

# Copy package.json and install required packages
COPY package.json .
RUN npm i && npm i -g typescript

# Copy project files
ADD . .

# Building project
RUN tsc

# Configuration Port
EXPOSE 3000

# Initialization Database
CMD npm run update:db

# Run application
CMD npm run start