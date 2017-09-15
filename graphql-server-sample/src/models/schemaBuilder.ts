import { GraphQLOptions } from 'apollo-server-core';
import { makeExecutableSchema } from 'graphql-tools';
import { loadSchemaFile } from '../utils/index';
import { resolvers } from './resolvers';

export async function getSchemaObject() {
  const typeDefs = await loadSchemaFile('GeneralSchema.gql');
  const graphQLSchema = makeExecutableSchema({
    resolvers,
    typeDefs,
  });
  const graphqlOption: GraphQLOptions = {
    schema: graphQLSchema,
  };

  return graphqlOption;
}
