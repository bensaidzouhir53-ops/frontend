FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_SITE_URL=https://nasama.shop
ARG NEXT_PUBLIC_API_URL=https://api.nasama.shop
ARG BACKEND_URL=https://api.nasama.shop
ARG NEXT_PUBLIC_META_PIXEL_ID=576636091443534
ARG NEXT_PUBLIC_TIKTOK_PIXEL_ID=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV BACKEND_URL=$BACKEND_URL
ENV NEXT_PUBLIC_META_PIXEL_ID=$NEXT_PUBLIC_META_PIXEL_ID
ENV NEXT_PUBLIC_TIKTOK_PIXEL_ID=$NEXT_PUBLIC_TIKTOK_PIXEL_ID
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_PUBLIC_SITE_URL=https://nasama.shop
ENV NEXT_PUBLIC_API_URL=https://api.nasama.shop
ENV BACKEND_URL=https://api.nasama.shop
ARG NEXT_PUBLIC_META_PIXEL_ID=576636091443534
ARG NEXT_PUBLIC_TIKTOK_PIXEL_ID=
ENV NEXT_PUBLIC_META_PIXEL_ID=$NEXT_PUBLIC_META_PIXEL_ID
ENV NEXT_PUBLIC_TIKTOK_PIXEL_ID=$NEXT_PUBLIC_TIKTOK_PIXEL_ID
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
