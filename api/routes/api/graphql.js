import graphqlHttp from 'express-graphql';
import schema from '../../schema';

const graphql = graphqlHttp({
  schema,
  graphiql: false,
  context: {
    test: true,
  },
})

export default graphql;
