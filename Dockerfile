FROM node:20-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json               ./ 
COPY yarn.lock .pnp*           ./ 
COPY .yarnrc.yml               ./ 
COPY .yarn                     .yarn 

RUN yarn install 

ENV NEXT_TELEMETRY_DISABLED=1 

RUN yarn build:web 

EXPOSE 3000

CMD ["yarn", "start:web"]