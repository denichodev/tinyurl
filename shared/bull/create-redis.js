import Redis from 'ioredis';

const config =
  process.env.NODE_ENV === 'production'
    ? {
        port: process.env.COMPOSE_REDIS_PORT,
        host: process.env.COMPOSE_REDIS_HOST,
        password: process.env.COMPOSE_REDIS_PASSWORD
      }
    : undefined;

export default extraConfig =>
  new Redis({
    ...config,
    ...extraConfig
  });
