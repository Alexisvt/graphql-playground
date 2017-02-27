// @flow
import { buildSchema } from 'graphql';
import { loadSchemaFile } from '../util/index';
import { type IMDB} from '../../data/mdb';

export const rootFactory = (mdb: IMDB) => ({
  getTodos({todoIdList = []}) {
    return mdb.getTodosByIds(todoIdList);
  },
  createTodo({input = {}}) {
    if (input) {
      return mdb.createTodo(input);
    }
    else {
      return Promise.reject('Invalid input type');
    }
  },
  updateTodo({taskId, input}) {
    if (taskId && input) {
      return mdb.updateTodo({ ...input, taskId });
    } else {
      return Promise.reject('taskId or input value is invalid');
    }
  },
  toggleTodo({taskId, isComplete}) {
    if(taskId && typeof isComplete === 'boolean') {
      return mdb.toggleTodo(taskId, isComplete);
    }else {
      return Promise.resolve('taskId or isComplete value is invalid');
    }
  },
  deleteTodo({taskId}) {
    if (taskId) {
      return mdb.deleteTodo(taskId);
    } else {
      return Promise.reject('Invalid taskId value');
    }
  }
});

export default async () => {
  try {
    const shorthandNotationSchemaString = await loadSchemaFile('TodoSchema.gql');
    return buildSchema(shorthandNotationSchemaString);
  }
  catch (e) {
    console.error(`Uh oh an ${e}`);
  }
};