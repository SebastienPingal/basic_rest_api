FROM node:16-alpine3.11

WORKDIR /app

COPY package.json ./

RUN npm install

EXPOSE 3000

COPY . .

RUN npx prisma generate

RUN npx tsc

CMD [ "node", "dist/server.js" ]