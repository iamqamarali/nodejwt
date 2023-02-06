FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# copy code
COPY . .

# Install app dependencies
RUN npm install

RUN npm install nodemon -g


# expose port 

EXPOSE 3000

# start app
CMD ["nodemon", "index.js"]