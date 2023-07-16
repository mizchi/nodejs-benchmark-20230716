FROM node:18 as builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY vite.config.ts ./vite.config.ts

RUN npm run build

# ------------------
FROM gcr.io/distroless/nodejs:18
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder --chown=nonroot:nonroot /app/dist ./dist
USER nonroot
EXPOSE 3000
CMD ["node", "dist/main.cjs"]
