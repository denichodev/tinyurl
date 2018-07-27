import { db } from './db';
import randomString from 'randomstring';
import redis from 'api/redis';

const getAllTicket = () => {
  return db
    .table('tickets')
    .run()
    .then(result => result);
};

const generateTicket = amount => {
  const ticketSet = new Set([]);

  while (ticketSet.size < amount) {
    ticketSet.add(randomString.generate(1));
  }

  const tickets = [...ticketSet.values()].map(ticket => ({ id: ticket }));

  console.log('Generating new tickets.');
  return db
    .table('tickets')
    .insert(tickets, { returnChanges: true })
    .run()
    .then(result => cacheTicket(result.changes));
};

const insertTicket = ticket => {
  return db
    .table('tickets')
    .insert(tickets, { returnChanges: true })
    .run()
    .then(result => result);
}

const cacheTicket = async tickets => {
  const pipeline = tickets.map(ticket => {
    return ['rpush', 'tickets', ticket.new_val.id];
  });

  return redis.pipeline(pipeline).exec((err, res) => {
    if (err) {
      console.log('ERROR', err);
    }

    redis.set('generatingTicket', false);
  });
};

const getTicket = async () => {
  const ticket = await redis.lpop('tickets', (err, res) => res);
  const generating = await redis.get('generatingTicket', (err, res) => res);
  //when no ticket, needs handling
  const len = await redis.llen('tickets', (err, res) => res);

  // IF GENERATING TICKET, DONT GENERATE AGAIN.
  if (len < 50 && generating !== 'true') {
    redis.set('generatingTicket', true);
    generateTicket(100);
  }

  return {
    ticket,
    ticketLeft: len
  };
};

export { getTicket, generateTicket, getAllTicket };
