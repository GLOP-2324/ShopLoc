FROM node:20.8.1 AS build
# Set working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install Angular CLI globally
RUN npm install -g @angular/cli@16.2.7

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json* /app/

# Install app dependencies
RUN npm install

# If you need to install specific types globally, it's better to include them in package.json
# This line is redundant if @types/jquery and @types/datatables.net are already in package.json
# RUN npm install @types/datatables.net @types/jquery --save-dev

# Add the rest of the app
COPY . /app

# Start the app
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
