import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { serveStatic } from "hono/cloudflare-workers";
import { logger } from "hono/logger";
import other from "./other";

const app = new Hono();

app.use("*", logger());
app.use(
  "/other/*",
  basicAuth({
    username: "user",
    password: "password",
  }),
);

app.use("/*", serveStatic({ root: "./static" }));
app.get("/", serveStatic({ path: "./index.html" }));

app.route("/other/*", other);

export default app;
