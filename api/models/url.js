import { db } from './db';

export const getUrlById = ({ input: { id } }) => {
  return db
    .table('urls')
    .get(id)
    .run()
    .then(result => result);
};

const createUrl = ({ input: { originalUrl } }) => {
  return db
    .table('urls')
    .insert({
      id: `asdfasdf=${originalUrl}`,
      originalUrl,
      createdAt: new Date(),
      deletedAt: null,
      expiredAt: null,
    })
    .run()
    .then(result => result.generated_keys[0])
    .then(id => getUrlById({ input: { id } }));
};

export { createUrl };
