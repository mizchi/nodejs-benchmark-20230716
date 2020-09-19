import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

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
  // ReactDOMServer.renderToNodeStream(<Tree depth={n} />).pipe(res);
  res.send(ReactDOMServer.renderToString(<Tree depth={n} />));
};

const app = express();
// const app = require("fastify")();
app.get("/", index);
app.listen(Number(PORT), () => {
  console.log("started", PORT);
});
