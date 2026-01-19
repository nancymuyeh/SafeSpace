# Stage 1: Build the application
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Test the application
FROM build AS test
RUN npm test

# Stage 3: Serve the application
FROM nginx:stable-alpine
COPY --from=build /app/dist/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
