FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src /app/src

RUN npm ci \
 && npm run build \
 && npm cache clean --force

EXPOSE 3000

CMD [ "node", "./dist/main.js"]