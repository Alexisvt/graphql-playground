import { GraphQLOptions } from 'apollo-server-core';
import { getSchemaObject } from './Schema';

export async function getGraphQLOptions() {
  const schema = await getSchemaObject();
  const graphQLOption: GraphQLOptions = {
    schema,
  };
  return graphQLOption;
}
