FROM node:20-alpine

WORKDIR /app

COPY ./services/next.ahhachul.com/package*  ./
COPY yarn.lock .pnp*           ./
COPY .yarnrc.yml               ./
COPY .yarn                     .yarn

RUN yarn install

COPY ./services/next.ahhachul.com .

RUN yarn build 

EXPOSE 3000

CMD ["yarn", "start"]