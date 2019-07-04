const keys = {
  pgDatabase: process.env.PG_DATABASE,
  pgHost: process.env.PG_HOST,
  pgPassword: process.env.PG_PASSWORD,
  pgPort: parseInt(process.env.PG_PORT ? process.env.PG_PORT : '5432', 10),
  pgUser: process.env.PG_USER,
  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(
    process.env.REDIS_PORT ? process.env.REDIS_PORT : '6379',
    10,
  ),
  serverPort: parseInt(
    process.env.API_PORT ? process.env.API_PORT : '5000',
    10,
  ),
}

export default keys
