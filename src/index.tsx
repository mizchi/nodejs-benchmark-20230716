import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { Suspense } from "react";
import { renderToReadableStream } from "react-dom/server";

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

const app = new Hono()
app.get('/', async (_c) => {
  const n = Math.round(1 + Math.random() * 4);
  const stream = await renderToReadableStream(
    <html>
      <body>
        <Suspense fallback={<p>Loading...</p>}>
          <Tree depth={n} />
        </Suspense>
      </body>
    </html>
  )
  return new Response(stream, {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'Content-Type': 'text/html',
    },
  })
})

serve(app)
