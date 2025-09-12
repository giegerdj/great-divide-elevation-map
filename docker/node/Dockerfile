FROM node:22-alpine

LABEL maintainer="dave@giegertechnology.com"

WORKDIR /app

# Install dependencies
RUN apk add --no-cache git

# Copy package files
COPY package*.json ./

# Install npm dependencies
RUN npm ci

EXPOSE 3000

# Default command for development
CMD ["npm", "run", "dev"]
