# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# If CRA uses "build", if Vite uses "dist"
RUN npm run build

# Runtime
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
# If CRA: change dist -> build
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
