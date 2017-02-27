// @flow
import { Db, ObjectID } from 'mongodb';
import { orderedFor } from '../src/util/index';

export interface IMDB {
  getTodosByIds(todosIds: any[]): Promise<any>;
  getTodos(): Promise<any>;
  createTodo(todoItem: Object): Promise<any>;
  updateTodo(todoItem: Object): Promise<any>;
  toggleTodo(taskId: string, isComplete: boolean): Promise<any>;
}

interface ITodo {
  taskId: string;
  name: string;
  isComplete: boolean;
}

export default (mgPool: Db): IMDB => ({
  async getTodosByIds(todoIds: ITodo[] = []) {

    if (todoIds.length === 0) {
      return this.getTodos();
    }
    const rows = await mgPool.collection('todos')
      .find({ taskId: { $in: todoIds } })
      .toArray();

    return orderedFor(rows, todoIds, 'taskId', true);
  },
  async getTodos() {
    const documents = await mgPool.collection('todos')
      .find({})
      .toArray();

    return documents;
  },
  async createTodo(todoItem: ITodo) {
    if (todoItem) {
      let todo = { ...todoItem };
      todo.taskId = (new ObjectID()).toString();
      const result = await mgPool.collection('todos').insert(todo);
      return result.ops[0];
    } else {
      return Promise.reject('Invalid Todo item');
    }
  },
  async updateTodo(todoItem: ITodo) {
    if (todoItem) {
      const response = await mgPool.collection('todos').updateOne({ 'taskId': todoItem.taskId }, { $set: { 'isComplete': todoItem.isComplete, 'name': todoItem.name } }, { upsert: true });
      console.log(response);
      return response;
    } else {
      return Promise.reject('Invalid Todo Item');
    }
  },
  async toggleTodo(taskId, isComplete) {
    if (taskId && typeof isComplete === 'boolean') { 
      const response = await mgPool.collection('todos').updateOne({taskId}, {$set: {isComplete}}, {upsert: true});
      console.log(response);
      return response;
    } else {
      return Promise.reject('taskId or isComplete is invalid');
    }
  }
});