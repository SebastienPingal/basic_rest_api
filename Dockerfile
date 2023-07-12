FROM node:16-alpine3.11

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npx prisma generate

CMD npm run migrate && npm run dev