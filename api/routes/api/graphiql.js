import graphqlHttp from 'express-graphql';
import schema from '../../schema';

const graphiql = graphqlHttp({
  schema,
  graphiql: true,
});

export default graphiql;
