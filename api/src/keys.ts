const keys = {
  pgDatabase: process.env.PGDATABASE,
  pgHost: process.env.PGHOST,
  pgPassword: process.env.PGPASSWORD,
  pgPort: parseInt(process.env.PGPORT ? process.env.PGPORT : '5432', 10),
  pgUser: process.env.PGUSER,
  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(
    process.env.REDIS_PORT ? process.env.REDIS_PORT : '6379',
    10,
  ),
  serverPort: parseInt(
    process.env.SERVER_PORT ? process.env.SERVER_PORT : '5000',
    10,
  ),
}

export default keys
