FROM nginx:alpine

COPY ./project/ /usr/share/nginx/html
COPY ./lib /usr/share/nginx/html/lib