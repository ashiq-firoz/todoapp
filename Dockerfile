# Use Node.js LTS (Long Term Support) as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Command to run the app
CMD ["npm", "run","dev"]
