import "source-map-support/register"
import "dotenv/config"
import Fastify from "fastify";

import { app as buyEth } from "./app"
import { API_SHARED_KEY } from "./ENV"

const port = process.env.PORT || 4000;

const app = Fastify({ logger: true });

interface Body { 
  cryptoPair?: string;
  cryptoAmount?: string;
  action?: string;
  api_shared_key?: string;
}

app.post("/", async (req, res) => {

  const { cryptoPair, cryptoAmount, action, api_shared_key } = req.body as Body

  if (api_shared_key !== API_SHARED_KEY) {
    throw new Error("api key doesn't match")
  }

  if (!cryptoPair) {
    throw new Error("crypto pair not supplied")
  }

  if (!cryptoAmount) {
    throw new Error("crypto amount not supplied")
  }

  if (!action) {
    throw new Error("action not supplied")
  }

  return buyEth({ cryptoPair, cryptoAmount, action })
});

(async () => {
  try {
    await app.listen(port, '0.0.0.0')
  } catch (error) {
    app.log.error(error);
  }
})()