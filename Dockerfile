FROM node:18.15-slim

WORKDIR /usr/app

COPY . ./

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]