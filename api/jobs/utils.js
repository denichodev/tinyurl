import createQueue from 'shared/bull/create-queue';

export const addQueue = (name, data, opts) => {
  const worker = createQueue(name);

  return worker.add({ ...data }, { ...opts });
};

export const createJob = (
  name, // name of the job
) => {
  try {
    console.log(`New job initiated: ${name}`);

    return addQueue(name, {
      removeOnComplete: true,
      removeOnFail: true,
      attempts: 1
    });
  } catch (err) {
    console.log(`🚨 Error initiating new job: \n${err}`);
  }
};
