FROM node:20.11.1-alpine AS base
WORKDIR /app

FROM base AS deps
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS builder
COPY . .
COPY .env ./
RUN pnpm build

FROM node:20.11.1-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile
RUN npm install -g serve
EXPOSE 3000

CMD ["sh", "-c", "serve -s dist -l 3000"]
