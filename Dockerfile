FROM node:17.0.1-alpine3.14


WORKDIR /app

COPY . .
RUN npm install


EXPOSE 3000

CMD ["node", "index.js"]