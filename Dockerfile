FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install application dependencies
RUN npm ci

# Copy the application source code to the container
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
