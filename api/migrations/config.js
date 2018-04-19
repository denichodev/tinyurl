const path = require('path');
const fs = require('fs');

const DEFAULT_CONFIG = {
  driver: 'rethinkdbdash',
  db: process.env.NODE_ENV === 'test' ? 'tinyurl-dev' : 'tinyurl',
  host: 'localhost',
  port: 28015,
  migrationsDirectory: 'api/migrations',
};

module.exports = DEFAULT_CONFIG;
