FROM node:17-alpine


WORKDIR /

COPY . /app
WORKDIR /app
RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]