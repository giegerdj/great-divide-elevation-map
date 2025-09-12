FROM nginx:alpine

LABEL maintainer="dave@giegertechnology.com"

# Copy custom nginx configuration for static site
COPY default /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]