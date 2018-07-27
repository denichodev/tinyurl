require('now-env');
const debug = require('debug')('api');
debug('logging with debug enabled!');
console.log('Server starting...');

import express from 'express';
import { createServer } from 'http';
import apiRoutes from './routes/api';

const app = express();

app.use('/api', apiRoutes);

// import { generateTicket } from './jobs';
// import { addQueue } from './jobs/utils';
// import processGenerateTicket from './queues/processGenerateTicket';
// import { getTicket } from './queues/processCacheTicket';
// import createQueue from 'shared/bull/create-queue';
// import { GENERATE_TICKET } from './queues/constants';

// const q = createQueue(GENERATE_TICKET, {
//   removeOnComplete: true,
//   removeOnFail: true,
//   attempts: 1
// });

// (async () => {
//   q.process(processGenerateTicket);
//   generateTicket();
//   // addQueue(GENERATE_TICKET, { amount: 5000 });

//   setInterval(async () => {
//     const ticket = await getTicket();
//     console.log(`Got ticket: ${ticket.ticket} with ${ticket.ticketLeft} left`);
//   }, 5);
// })();


const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const server = createServer(app);

server.listen(PORT);
console.log(`GraphQL server running at http://localhost:${PORT}/api`);
