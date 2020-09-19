# nodejs-benchmark-playground

benchmark playground

- 0x
- autocannon
- heapdump
- Docker
- cluster

## Build and Run

```
$ yarn tsc -p .
$ node lib/index.js # single core
$ node lib/with-cluster.js # cluster
$ node lib/with-heapdump.js # heapdump
```

## Docker

```
docker build . -t nodejs-benchmark
docker run --rm -p 4000:4000 nodejs-benchmark
```

## LICENSE

MIT
