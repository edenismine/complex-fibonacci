FROM node:alpine
WORKDIR /app
COPY ./*.json ./
RUN npm install
COPY ./src ./src
RUN npx tsc
CMD ["npx", "nodemon"]