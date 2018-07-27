import { db } from './db';

export const getTicketAll = () => {
  return db
    .table('tickets')
    .run()
    .then(result => result);
}

export const getTicketById = ({ input: { id } }) => {
  return db
    .table('tickets')
    .get(id)
    .then(result => result);
}

export const insertTicket = ({ input: { tickets } }) => {
  return db
    .table('tickets')
    .insert(tickets, { returnChanges: true })
    .run()
    .then(result => result);
}
