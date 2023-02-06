FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# copy code
COPY . .

# Install app dependencies
RUN npm install

# expose port 

EXPOSE 3000

# start app
CMD ["node", "index.js"]