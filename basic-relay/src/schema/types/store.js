// @flow
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql';

import {
  nodeDefinitions,
  globalIdField,
  fromGlobalId,
  connectionArgs,
  connectionFromPromisedArray
} from 'graphql-relay';
import { TodoType, TodoConnectionType } from './todo';

class Store {}
export const store = new Store();

const nodeDefs = nodeDefinitions(
  (globalId) => {
    const {type} = fromGlobalId(globalId);
    if (type === 'Store') {
      return store;
    }
    return null;
  },
  (resolvedObj) => {
    if(resolvedObj instanceof Store) {
      return StoreType;
    }
    return null;
  }
);

const StoreType = new GraphQLObjectType({
  name: 'Store',
  fields: () => ({
    id: globalIdField('Store'),
    todos: {
      type: new GraphQLList(TodoType),
      args: {
        todoIdList: {
          type: new GraphQLList(GraphQLString)
        }
      },
      resolve: (obj, { todoIdList = [] }, { mdb }: IContextObj) => mdb.getTodosByIds(todoIdList)
    },
    todoConnection: {
      type: TodoConnectionType.connectionType,
      args: {...connectionArgs, query: { type: GraphQLString }},
      resolve: (obj, {query, ...args}, { mdb }: IContextObj) => connectionFromPromisedArray(mdb.getTodosRelay(query), args)
    }
  }),
  interfaces: [nodeDefs.nodeInterface]
});

export {StoreType as default, nodeDefs};