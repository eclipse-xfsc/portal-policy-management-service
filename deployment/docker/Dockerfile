# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY /src .

# Install app dependencies
RUN npm install

EXPOSE 3000

# Start the server using the production build
CMD [ "node", "server.js" ]