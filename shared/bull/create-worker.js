import http from 'http';
import createQueue from './create-queue';
import toobusy from '../middlewares/toobusy';
import sumArray from '../array/sumArray';

const createWorker = (queueMap, queueOptions) => {
  const queues = Object.keys(queueMap).map(name => {
    const queue = createQueue(name, queueOptions);
    queue.process(queueMap[name]);
    return queue;
  });

  return http.createServer((req, res) => {
    toobusy(req, res, () => {
      res.setHeader('Content-Type', 'application/json');

      // Summarize the data across all the queues
      Promise.all(queues.map(queue => queue.getJobCounts())).then(jobCounts => {
        const data = {
          waiting: sumArray(jobCounts, 'waiting'),
          active: sumArray(jobCounts, 'active'),
          completed: sumArray(jobCounts, 'completed'),
          failed: sumArray(jobCounts, 'failed'),
          delayed: sumArray(jobCounts, 'delayed')
        };

        res.end(JSON.stringify(data, null, 2));
      });
    });
  });
};

export default createWorker;
