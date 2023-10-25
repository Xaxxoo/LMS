import { Redis } from "ioredis";
require("dotenv").config();

const redisClient = () => {
  if (process.env.REDIS_UR) {
    console.log("Redis is connected");
    return process.env.REDIS_UR;
  }
  throw new Error("Redis connection failed");
};


export const redis = new Redis(redisClient())