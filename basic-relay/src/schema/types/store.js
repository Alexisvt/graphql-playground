// @flow
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql';

import {
  globalIdField,
  connectionArgs,
  connectionFromPromisedArray
} from 'graphql-relay';
import { TodoType, TodoConnectionType } from './todo';

class Store {}
export const store = new Store();

export default new GraphQLObjectType({
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
      args: connectionArgs,
      resolve: (obj, args, { mdb }: IContextObj) => connectionFromPromisedArray(mdb.getTodos(), args)
    }
  })
});