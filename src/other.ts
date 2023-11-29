import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";

const app = new Hono();

app.get("/", serveStatic({ path: "./other.html" }));
app.post("/", (c) => c.html("sd post"));

export default app;
