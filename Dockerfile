FROM node:20.13.0-alpine

RUN npm install -g pnpm

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY packages/utils           ./packages/utils
COPY services/one-app        ./services/one-app
COPY nx.json tsconfig*       ./ 
COPY package.json           ./
COPY pnpm-lock.yaml        ./ 
COPY pnpm-workspace.yaml   ./ 
COPY .nx                   ./ 

RUN pnpm install 
RUN pnpm install sharp

ENV NEXT_TELEMETRY_DISABLED=1 

RUN pnpm nextjs:build

EXPOSE 3000

CMD ["pnpm", "nextjs:start"]