FROM nginx
ARG CI
ENV CI=$CI
COPY ./prod.conf /etc/nginx/conf.d/default.conf
EXPOSE 80