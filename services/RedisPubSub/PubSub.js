import { createClient } from 'redis' 

import dotenv from "dotenv"

dotenv.config()

export const redis_client = createClient({ url: process.env.REDISURL })
export const redis_publisher = redis_client.duplicate()

export async function RedisConnect() {
    await redis_client.connect()
    await redis_publisher.connect()
}

