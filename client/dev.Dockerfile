FROM node:alpine as install_deps
WORKDIR /app
COPY ./*.json ./
RUN npm install

FROM node:alpine
WORKDIR /app
COPY --from=install_deps /app ./
COPY . .
CMD ["npm", "run", "start"]