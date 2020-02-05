const keys = require("./keys");
const redis = require("redis");
const debug = require("debug")("app");

debug("==================1 " + keys.redisHost + " " + keys.redisPort);
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on("message", (channel, message) => {
  debug("==================on message " + message);
  redisClient.hset("values", message, fib(parseInt(message)));
});
sub.subscribe("insert");
