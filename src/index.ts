import "source-map-support/register"
import "dotenv/config"

import { app } from "./app"

(async () => await app())()
