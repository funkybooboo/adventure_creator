import { Application, Context } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

// Middleware for logging
app.use(async (ctx: Context, next: Function) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  await next();
});

// Define a route to return "Hello, World!"
app.use((ctx: Context) => {
  ctx.response.body = "Hello, World!";
});

// Start the server on port 8000
console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });

