import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

console.log("process.env", process.env.NODE_ENV);
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
