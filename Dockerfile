FROM node:14 as builder

WORKDIR /app
COPY package*.json ./

RUN npm i
COPY . .

RUN npm run build

FROM node:14-slim
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm i --production

EXPOSE 8000

CMD ["node", "./dist/index.js"]