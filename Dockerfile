# Use the official Node.js 18 base image
FROM node:18

# Create and use app directory
WORKDIR /app

# Copy our script into the container
COPY script.js /app/script.js

# If you have package.json and package-lock.json, copy them and install dependencies
# COPY package*.json /app/
# RUN npm install

# By default, run script.js
CMD ["node", "script.js"]
