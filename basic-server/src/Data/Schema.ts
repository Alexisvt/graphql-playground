import { makeExecutableSchema } from 'graphql-tools';

import { loadSchemaFile } from '../utils';
import { resolvers } from './Resolvers';

export async function getSchemaObject() {
  const typeDefs = await loadSchemaFile('Sample');
  return makeExecutableSchema({
    resolvers,
    typeDefs,
  });
}
