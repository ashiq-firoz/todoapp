# Use Node.js LTS (Long Term Support) as the base image
FROM node:20-alpine

# Set working directory dont confuse with your folder name (you can name it anything other than app too)
WORKDIR /app

LABEL description="Todo App"

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
