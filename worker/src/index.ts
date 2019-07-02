import { RedisClient } from 'redis'
import keys from './keys'

const redisClient = new RedisClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
})
const sub = redisClient.duplicate()

function fib(index: number): number {
  if (index < 2) {
    return 1
  }
  return fib(index - 1) + fib(index - 2)
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message, 10)).toString())
})
sub.subscribe('insert')
