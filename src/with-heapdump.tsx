import path from "path";
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

const USE_FASTIFY = process.env.FASTIFY === "true";
const USE_HEAPDUMP = process.env.HEAPDUMP === "true";
if (USE_HEAPDUMP) {
  const heapdump = require("heapdump");
  console.log("start heapdump");
  process.on("SIGINT", function () {
    const out = path.join(__dirname, "../" + Date.now() + ".heapsnapshot");
    console.log("dump", out);
    global.gc(); // gc関数は --expose-gc フラグを付ける必要があります。
    heapdump.writeSnapshot(out);
    //終了処理…
    process.exit(0);
  });
}

const PORT = process.env.PORT ?? 4000;

function Tree(props: { depth: number }) {
  return (
    <div>
      <span>
        {"x".repeat(props.depth)}:{props.depth}
      </span>
      {[...Array(props.depth).keys()].map((n) => {
        return (
          <div key={n}>
            <Tree depth={props.depth - 1} />;
          </div>
        );
      })}
    </div>
  );
}

const index = (_req: any, res: any) => {
  const n = Math.round(1 + Math.random() * 4);
  ReactDOMServer.renderToNodeStream(<Tree depth={n} />).pipe(res);
};

// function createApp() {
//   // const app = express();
//   return app;
// }

if (USE_FASTIFY) {
  console.log("start as fastify", PORT);
  const fastify = require("fastify");
  const app = fastify({ logger: true });
  app.get("/", index);
  app.listen(Number(PORT), "0.0.0.0", (err: any, address: any) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    console.log("fastify started", err, address);
  });
} else {
  const app = express();
  app.get("/", index);
  app.listen(Number(PORT), () => {
    console.log("started", PORT);
  });
}
