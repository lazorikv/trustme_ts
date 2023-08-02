FROM node:14 as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Use a smaller Node.js image for production
FROM node:14-slim

# Set working directory
WORKDIR /app

# Copy the built output from the previous stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm i --production

# Expose the API port (adjust this if your app listens on a different port)
EXPOSE 8000

# Start the application
CMD ["node", "./dist/index.js"]