FROM cypress/browsers:node18.12.0-chrome106-ff106
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
RUN ["npm", "run", "cypress:run"]