import { makeExecutableSchema } from 'graphql-tools';

import { loadSchemaFile } from '../utils';
import { resolvers } from './Resolvers';

export async function getSchemaObject() {
  const typeDefs = await loadSchemaFile('Sample.gql');
  return makeExecutableSchema({
    resolvers,
    typeDefs,
  });
}
