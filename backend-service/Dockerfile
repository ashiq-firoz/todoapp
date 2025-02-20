# Use Node.js LTS (Long Term Support) as the base image
FROM node:20-alpine

# Set working directory dont confuse with your folder name (you can name it anything other than app too)
WORKDIR /app/backend

LABEL description="Todo App Backend"

# Install dependencies first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3002
EXPOSE 3002

# Run mongodb before executing this docker file 
# RUN node init.db.js

# Command to run the app
CMD ["npm", "start"]
