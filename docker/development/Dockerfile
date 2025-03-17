FROM node:18-alpine

# Add OpenSSL and other necessary dependencies
RUN apk add openssl libc6-compat

# Set working directory
WORKDIR /src

# Copy only package.json
COPY package.json package-lock.json ./

# Copy Prisma schema
COPY lib/database/prisma ./lib/database/prisma

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Enable development mode
ENV NODE_ENV=development

# Generate Prisma client
RUN npx prisma generate

# Start Next.js development server
CMD npx prisma migrate dev && npx prisma db seed && npm run dev