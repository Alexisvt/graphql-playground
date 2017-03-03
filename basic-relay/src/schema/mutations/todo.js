// @flow
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';
import { TodoConnectionType } from '../types/todo';
import StoreType, { store } from '../types/store';
import { mutationWithClientMutationId } from 'graphql-relay';

export const createTodoMutation = mutationWithClientMutationId({
  name: 'CreateTodo',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    isComplete: { type: new GraphQLNonNull(GraphQLBoolean) }
  },
  outputFields: {
    todoEdge: {
      type: TodoConnectionType.edgeType,
      resolve: ({ insertedId, ...todoItem }) => ({ node: todoItem, cursor: insertedId })
    },
    store: {
      type: StoreType,
      resolve: () => store
    }
  },
  mutateAndGetPayload: (inputObj, { mdb }: IContextObj) => mdb.createTodoRelay(inputObj)
});