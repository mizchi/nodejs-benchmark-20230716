import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import cluster from "cluster";
import os from "os";

console.log("process.env", process.env.CLUSTER, process.env.NODE_ENV);
const USE_CLUSTER = process.env.CLUSTER == "true";
const NUM_CPUS = os.cpus().length;

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

if (USE_CLUSTER) {
  if (cluster.isMaster) {
    [...Array(NUM_CPUS).keys()].forEach(() => {
      cluster.fork();
    });
  } else {
    createApp().listen(4000, () => {
      console.log("started", id);
    });
  }
} else {
  createApp().listen(4000, () => {
    console.log("started", id);
  });
}
