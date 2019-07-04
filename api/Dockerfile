FROM node
ARG CI
ENV CI=$CI
WORKDIR /app
COPY ./*.json ./
RUN echo 'installing dependencies...' && npm install
COPY ./src ./src
RUN echo 'compiling typescript...' && npx tsc
RUN echo 'testing...' && npm run test
CMD ["npm", "start"]