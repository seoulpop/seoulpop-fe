FROM node:20.11.1-alpine AS base
WORKDIR /app

FROM base AS deps
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS builder
COPY . .
RUN pnpm build
RUN ls /app/dist # 빌드 결과 확인

FROM base AS runner
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile

EXPOSE 3000
ENV NODE_ENV=production
ENV HOST=0.0.0.0

CMD ["node", "dist/main.js"]
