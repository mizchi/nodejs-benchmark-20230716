FROM node:14 as builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY webpack.config.js ./webpack.config.js

RUN npm run build

# ------------------
FROM alpine:latest as release
RUN apk add --no-cache nodejs
ENV NODE_ENV production
WORKDIR /app
# COPY --from=builder /app/lib ./lib
COPY --from=builder /app/dist/ ./dist
EXPOSE 4000
CMD ["node", "dist/main.js"]
