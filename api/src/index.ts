import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import keys from './keys'

// Express App Setup
const app = express()
app.use(cors())
app.use(bodyParser.json())

// Postgres Client Setup
import { Pool } from 'pg'
const pgClient = new Pool({
  database: keys.pgDatabase,
  host: keys.pgHost,
  password: keys.pgPassword,
  port: keys.pgPort,
  user: keys.pgUser,
})
pgClient.on('error', () => console.log('Lost PG connection'))

// Redis Client Setup
import redis from 'redis'
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
})
const redisPublisher = redisClient.duplicate()

// Express route handlers
app.get('/', (req, res) => {
  res.send('Hi')
})

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * from values')

  res.send(values.rows)
})

app.get('/values/current', async (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.send(values)
  })
})

app.post('/values', async (req, res) => {
  const index = req.body.index
  if (parseInt(index, 10) > 40) {
    return res.status(422).send('Index too high')
  } else {
    redisClient.hset('values', index, 'Nothing yet!')
    redisPublisher.publish('insert', index)
    return res
      .status(200)
      .send(
        await pgClient.query('INSERT INTO values(number) VALUES($1)', [index]),
      )
  }
})

function createTable(retriesLeft: number) {
  if (retriesLeft > 0) {
    console.log(
      `Attempting (${retriesLeft} retries left) to connect to postgress...`,
    )
    pgClient
      .connect()
      .then((client) =>
        client.query('CREATE TABLE IF NOT EXISTS values (number INT)'),
      )
      .then((result) => console.log(result))
      .catch((e) => {
        console.error(e)
        setTimeout(() => createTable(retriesLeft - 1), 3000)
      })
  }
}

app.listen(keys.serverPort, (err) => {
  createTable(5)
  console.log(`Listening on port ${keys.serverPort}`)
})
