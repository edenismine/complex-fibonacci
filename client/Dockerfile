FROM node as builder
ARG CI
ENV CI=$CI
WORKDIR /app
COPY ./*.json ./
RUN echo 'installing build dependencies...' && npm install
COPY ./src ./src
COPY ./public ./public
RUN echo 'testing...' && npm run test
RUN echo 'building...' && npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/prod.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html