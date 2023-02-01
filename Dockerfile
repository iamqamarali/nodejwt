FROM mongo-express:0.54.0


WORKDIR /app

COPY . .
RUN npm install


EXPOSE 3000

CMD ["node", "index.js"]