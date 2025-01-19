FROM node:20-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY services/one-app          ./services/one-app
COPY nx.json tsconfig*         ./ 
COPY package.json              ./
COPY pnpm-lock.yaml            ./ 
COPY pnpm-workspace.yaml       ./ 
COPY .nx                       ./ 

RUN pnpm install 

ENV NEXT_TELEMETRY_DISABLED=1 

RUN pnpm build:one-app 

EXPOSE 3000

CMD ["pnpm", "start:one-app"]
