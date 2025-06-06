FROM node:16-alpine

# Set work directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project
COPY . .

# Start the application in development mode
CMD ["npm", "start"] 