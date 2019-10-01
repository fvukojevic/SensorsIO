# develop stage
FROM node:11.1-alpine

WORKDIR /app

RUN apk update && apk add yarn npm
RUN yarn global add serve

COPY . /app/

RUN npm install
RUN npm install cross-env
RUN npm run build

CMD ["serve"]

