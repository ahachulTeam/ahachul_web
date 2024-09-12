FROM node:20-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY ./services/next.ahhachul.com/package*  ./ 
COPY yarn.lock .pnp*           ./ 
COPY .yarnrc.yml               ./ 
COPY .yarn                     .yarn 

RUN yarn install 

COPY ./services/next.ahhachul.com . 

ENV NODE_ENV=production 
ENV NEXT_TELEMETRY_DISABLED=1 

RUN yarn build 

EXPOSE 3000

CMD ["yarn", "start"]