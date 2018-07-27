import redis from 'api/redis';
import { addQueue } from '../jobs/utils';
import { GENERATE_TICKET } from './constants';

export const getTicket = async () => {
  const ticket = await redis.lpop('tickets', (err, res) => res);
  const isGenerating = await redis.get('generatingTicket', (err, res) => res);
  const len = await redis.llen('tickets', (err, res) => res);

  if (len < 5000 && isGenerating !== 'true') {
    redis.set('generatingTicket', true);
    addQueue(GENERATE_TICKET, { amount: 5000 });
  }

  return {
    ticket,
    ticketLeft: len
  };
};

export default tickets => {
  const pipeline = tickets.map(ticket => {
    return ['rpush', 'tickets', ticket.new_val.id];
  });

  return redis.pipeline(pipeline).exec((err, res) => {
    redis.set('generatingTicket', false);

    if (err) {
      console.log('🚨 Error while writing tickets to cache.');
      throw err;
    }
  });
};
