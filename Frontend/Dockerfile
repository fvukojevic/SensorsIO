# develop stage
FROM node:11.1-alpine

WORKDIR /app

COPY package*.json ./
RUN apk update && apk add yarn npm
RUN yarn global add serve

COPY . .

CMD ["serve"]

