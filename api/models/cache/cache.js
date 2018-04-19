const debug = require('debug')('api:cache');
import redis from './redis';

if (process.env.DISABLE_CACHE) {
  console.log(
    'Cache disabled, either unset DISABLE_CACHE env variable or run in production mode to enable.'
  );
}

const set = (key, value) => {
  redis.set(key, value)
};
