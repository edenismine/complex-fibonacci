FROM node:alpine
WORKDIR /app
COPY ./*.json ./
RUN npm install
COPY ./src ./src
CMD ["npm", "start"]