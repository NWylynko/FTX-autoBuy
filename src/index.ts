import "source-map-support/register"
import "dotenv/config"
import Fastify from "fastify";

import { app as buyEth } from "./app"

const port = process.env.PORT || 4000;

const app = Fastify({ logger: true });

app.get("/", buyEth);

(async () => {
  try {
    await app.listen(port, '0.0.0.0')
  } catch (error) {
    app.log.error(error);
  }
})()