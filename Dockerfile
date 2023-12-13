# Geting node runtime
FROM node:20-alpine

# Setting work dir
WORKDIR /src

# Copying package.json and package-lock.json
COPY package*.json ./

# Running npm install
RUN npm install

# Copying code using .. to make 
COPY . .

# Exposing PORT 3000
EXPOSE 3000

# Run command
CMD ["node", "server.js"]