const keys = {
  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(process.env.REDIS_PORT ? process.env.REDIS_PORT : '6379', 10),
}

export default keys
