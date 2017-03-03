// @flow
import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';
import { createTodoMutation } from './mutations/todo';
import StoreType, { store, nodeDefs } from './types/store';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeDefs.nodeField,
    store: {
      type: StoreType,
      resolve: () => store
    }
  })
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createTodo: createTodoMutation
  })
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

export default schema;