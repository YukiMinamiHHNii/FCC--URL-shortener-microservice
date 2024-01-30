FROM node:current-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV SERVER_PORT=3000
ENV MONGO_DB_CONNECTION=mongodb://host.docker.internal:27017/url-shortener
CMD ["node", "app.js"]