# Use full Node for building and running
FROM node:20-alpine

# Set working directory
WORKDIR /server

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the backend code
COPY . .

# Build TypeScript
RUN npx tsc

# Expose backend port
EXPOSE 3000

# Run the compiled JS
CMD ["node", "dist/server.js"]
