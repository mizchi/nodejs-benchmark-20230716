# nodejs-benchmark-playground-20230716

nodejs benchmark playground

- 0x
- autocannon
- Docker

## Build and Run

```bash
$ npm install
$ npm run build
$ node dist/main.cjs
```

## Docker

```bash
docker build . -t nodejs-benchmark
docker run --rm -p 3000:3000 nodejs-benchmark
```

## LICENSE

MIT
