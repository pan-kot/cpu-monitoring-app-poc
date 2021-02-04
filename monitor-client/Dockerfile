FROM node:15

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN yarn install --silent && yarn deps

COPY . .

CMD yarn client start