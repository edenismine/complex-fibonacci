# npm run build is required before building prod image
FROM nginx
EXPOSE 3000
COPY ./nginx/prod.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html