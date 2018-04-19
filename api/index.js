console.log('Server starting...');
require('now-env');
const debug = require('debug')('api');
import express from 'express';
import { createServer } from 'http';
import redis from './models/cache/redis';

debug('logging with debug enabled!');
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

const app = express();

import apiRoutes from './routes/api';
app.use('/api', apiRoutes);

// import { createUrl } from './models/url';
import { generateTicket, getTicket } from './models/ticket';

generateTicket(10);
// (async () => {
//   setInterval(() => {
//     getTicket().then(res => {
//       console.log(
//         `Got ticket: ${res.ticket}, there are ${res.ticketLeft} tickets left.`
//       );
//     });
//   }, 100);
// })();

// generateTicket(100).then(res => console.log('res', res) || res);
// generateTicket(100);

// console.log('process env api:', process.env);

const server = createServer(app);

server.listen(PORT);
console.log(`GraphQL server running at http://localhost:${PORT}/api`);
