const IS_PROD = !process.env.FORCE_DEV && process.env.NODE_ENV === 'production';

const DEFAULT_CONFIG = {
  // Connect to the test database when, well, testing
  db: !process.env.TEST_DB ? 'tinyurl' : 'test',
  max: 500, // Maximum number of connections, default is 1000
  buffer: 5, // Minimum number of connections open at any given moment, default is 50
  timeoutGb: 60 * 1000, // How long should an unused connection stick around, default is an hour, this is a minute
};

const config = IS_PROD ? {} : DEFAULT_CONFIG;

const r = require('rethinkdbdash')(config);

export const db = r;
