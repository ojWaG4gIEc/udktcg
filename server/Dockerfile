FROM node:10-alpine

LABEL version="1.0.0"

WORKDIR '/app'
COPY ./package.json ./
RUN yarn install
COPY . .

CMD ["node", "index.js"]
