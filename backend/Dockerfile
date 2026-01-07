# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Stage 2: Serve the application
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app .

EXPOSE 3000

CMD ["npm", "run", "dev"]
