import randomString from 'randomstring';
import { getTicketById, insertTicket } from '../models/ticket';
import { getUrlById } from '../models/url';
import { MAX_TICKET_LENGTH } from './constants';
import processCacheTicket from './processCacheTicket';

export const isUnique = async id => {
  const ticket = await getTicketById({ input: { id } });
  const url = await getUrlById({ input: { id } });

  return !ticket && !url;
};

export default async job => {
  const { amount } = job.data;

  if (!amount) {
    throw 'No amount defined while generating ticket';
  }

  const ticketSet = new Set([]);

  while (ticketSet.size < amount) {
    let ticket = randomString.generate(MAX_TICKET_LENGTH);
    let unique = await isUnique(ticket);

    while (!unique) {
      ticket = randomString.generate(MAX_TICKET_LENGTH);
      unique = await isUnique(ticket);
    }

    ticketSet.add(ticket);
  }

  const tickets = [...ticketSet.values()].map(ticket => ({ id: ticket }));
  const generatedTickets = await insertTicket({ input: { tickets } });

  processCacheTicket(generatedTickets.changes);
};
