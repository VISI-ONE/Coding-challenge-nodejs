# Use the official Node.js 18 image as a parent image
FROM node:18-alpine

# Install nodemon for hot reloading (optional for dev mode)
RUN npm install -g nodemon

# Set the working directory in the container

RUN mkdir -p /usr/app/server

WORKDIR /usr/app/server

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Fix for native modules that may not build correctly
RUN npm rebuild


# EXPOSE Port
EXPOSE 3000

# Command to run the app
CMD [ "node", "src/main.js" ]
