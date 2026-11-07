FROM nginx:1.27-alpine
COPY ./nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY ./site/ /usr/share/nginx/html/
ENV PORT=8080
EXPOSE 8080
