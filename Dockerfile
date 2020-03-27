# The builder from node image
FROM node:10-jessie AS builder

# Move our files into directory name "app"
WORKDIR /app
COPY [".", "."]
RUN npm install @angular/cli@8.3.8 -g
RUN npm install
RUN ng build --prod

# Build a small nginx image with static website
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/covidiagnc /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
