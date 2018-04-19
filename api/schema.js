import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';

const Root = /* GraphQL */ `
  # The dummy queries and mutations are necessary because
  # graphql-js cannot have empty root types and we only extend
  # these types later on
  # Ref: apollographql/graphql-tools#293
  type Query {
    dummy: String
  }

  type Mutation {
    dummy: String
  }

  type Subscription {
    dummy: String
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

const resolvers = {};

const schema = makeExecutableSchema({
  typeDefs: [Root],
  resolvers
});

export default schema;
