import Queue from 'bull';
import createRedis from './create-redis';

const client = createRedis();
const subscriber = createRedis();

export default (name, queueOptions) => {
  const queue = new Queue(name, {
    createClient: function(type) {
      switch (type) {
        case 'client':
          return client;
        case 'subscriber':
          return subscriber;
        default:
          return createRedis();
      }
    },
    defaultJobOptions: {
      removeOnComplete: true,
      attempts: 1
    },
    ...queueOptions
  });

  return queue;
};
