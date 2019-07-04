# API_PORT and CLIENT_PORT variables must be provided at runtime
FROM nginx
ARG CI
ENV CI=$CI
COPY ./prod.conf /etc/nginx/conf.d/default.conf
EXPOSE 80