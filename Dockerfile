FROM node:20.13.0-alpine

RUN npm install -g corepack@latest && \
    corepack enable && \
    corepack prepare pnpm@9.1.0 --activate

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY packages          ./packages
COPY services/one-app  ./services/one-app
COPY nx.json tsconfig* ./
COPY package.json      ./
COPY pnpm-lock.yaml    ./
COPY pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile && \
    cd services/one-app && \
    pnpm install sharp

ENV NEXT_TELEMETRY_DISABLED=1 

RUN pnpm nextjs:build

EXPOSE 3000

CMD ["pnpm", "nextjs:start"]
