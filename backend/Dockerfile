# Stage 1: Build the application
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Stage 2: Test the application
FROM build AS test
RUN npm test

# Stage 3: Serve the application
FROM node:20-slim
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000
CMD ["npm", "run", "dev"]
