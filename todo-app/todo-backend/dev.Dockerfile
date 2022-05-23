FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV DEBUG=todo-backend:*

USER node

CMD npm run dev
