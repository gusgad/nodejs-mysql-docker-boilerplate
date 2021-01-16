FROM node:14.15.3

RUN mkdir -p /opt/app

ENV NODE_ENV production

RUN apt-get -q update && apt-get -qy install netcat
RUN npm i npm@latest -g

WORKDIR /opt
COPY package.json package-lock.json* ./
RUN npm install && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . /opt/app

CMD ["nodemon", "index.js"]

EXPOSE 5000
