import path from "path";

import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

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

const id = Math.random();
function createApp() {
  const app = express();
  const index = (_req: express.Request, res: express.Response) => {
    const n = Math.round(1 + Math.random() * 4);
    ReactDOMServer.renderToNodeStream(<Tree depth={n} />).pipe(res);
  };
  app.get("/", index);
  return app;
}

createApp().listen(PORT, () => {
  console.log("started", id);
});
