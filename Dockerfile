FROM node:14 as builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src src
COPY tsconfig.json tsconfig.json
RUN npm run build

# ------------------
# FROM node:alpine as release
FROM alpine:latest

RUN apk add --no-cache nodejs npm

ENV NODE_ENV production
# ENV FASTIFY true
WORKDIR /app

COPY --from=builder /app/package*.json ./

RUN npm install --production
COPY --from=builder /app/lib ./lib

EXPOSE 4000
CMD ["node", "lib/index.js"]
