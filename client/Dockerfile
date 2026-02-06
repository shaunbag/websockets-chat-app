# Use full Node for building and dev server
FROM node:20-alpine

WORKDIR /client

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all frontend code
COPY . .

# Build for production (optional)
RUN npm run build

# Expose Vite dev server port
EXPOSE 5173

# Run dev server
CMD ["npx", "vite", "--host"]
