import { Router } from 'express';

const apiRouter = Router();

import graphiql from './graphiql';
if (process.env.NODE_ENV !== 'production') {
  apiRouter.use('/graphiql', graphiql);
}

import graphql from './graphql';
apiRouter.use('/', graphql)

export default apiRouter;
