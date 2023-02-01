import express from "express"
import dotenv from "dotenv"

import { ContractEventHook } from "./services/SmartContact/ContractEventHook.js"
import { RedisConnect } from "./services/RedisPubSub/PubSub.js"

dotenv.config()

const app  = express()

app.listen(process.env.PORT, async () => {
    console.log(`App run on http://localhost:${ process.env.PORT  }`)
    await RedisConnect()
    await ContractEventHook()
})
