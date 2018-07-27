import { createJob } from './utils';
import { GENERATE_TICKET } from '../queues/constants';

export const generateTicket = () => createJob(GENERATE_TICKET);
