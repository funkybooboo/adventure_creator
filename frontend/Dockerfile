# 1) Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# install deps
COPY package.json package-lock.json ./
RUN npm ci

# copy source & build
COPY . .
RUN npm run build

# 2) Production image
FROM nginx:stable-alpine
# copy built files into nginx html dir
COPY --from=builder /app/dist /usr/share/nginx/html

# expose nginx port
EXPOSE 80

# start nginx
CMD ["nginx", "-g", "daemon off;"]
