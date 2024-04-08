FROM node:20.8.1 AS build
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
npm install @types/jquery --save-dev
# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install 
RUN npm install -g @angular/cli@16.2.7

# add app
COPY . /app
# start app
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]

