FROM mcr.microsoft.com/playwright:v1.41.0-jammy AS base

FROM base AS builder
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=bot --docker

FROM base AS installer
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm install -g pnpm
RUN pnpm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo run build --filter=bot...

FROM base AS runner
WORKDIR /app
# Playwright needs specific user permissions or root depending on setup.
# Using root for simplicity in this container context, or pwuser if preferred.

COPY --from=installer /app .

CMD node apps/bot/dist/index.js
