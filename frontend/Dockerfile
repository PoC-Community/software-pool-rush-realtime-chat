FROM node:17-alpine

WORKDIR /app

EXPOSE 3000

COPY . .

RUN npm i && npm run build

ENTRYPOINT [ "npm", "run", "prod" ]
