// @flow
import { Db, ObjectID } from 'mongodb';
import { orderedFor } from '../src/util/index';

export interface IMDB {
  getTodosByIds(todosIds: any[]): Promise<any>;
  getTodos(): Promise<any>;
  createTodo(todoItem: Object): Promise<any>;
  createTodoRelay(todoItem: Object): Promise<any>;
  updateTodo(todoItem: Object): Promise<any>;
  toggleTodo(taskId: string, isComplete: boolean): Promise<any>;
  deleteTodo(taskId: string): Promise<any>;
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
    let rows = await mgPool.collection('todos')
      .find({ taskId: { $in: todoIds } })
      .toArray();

    rows = rows.map(doc => {
      const { taskId: id, isComplete, name } = doc;
      return { id, isComplete, name };
    });

    return orderedFor(rows, todoIds, 'taskId', true);
  },
  async getTodos(numDoc = 0) {

    let documents; 

    if (numDoc) {
      documents = await mgPool.collection('todos')
        .find({})
        .limit(numDoc)
        .toArray();

    } else {
      documents = await mgPool.collection('todos')
        .find({})
        .toArray();
    }

    documents = documents.map(doc => {
      const { taskId: id, isComplete, name } = doc;
      return { id, isComplete, name };
    });

    return documents;
  },
  async createTodo(todoItem: ITodo) {
    if (todoItem) {
      let todo = { ...todoItem };
      todo.taskId = (new ObjectID()).toString();
      const result = await mgPool.collection('todos').insert(todo);
      const { taskId: id, isComplete, name } = result.ops[0];
      return { id, isComplete, name };
    } else {
      return Promise.reject('Invalid Todo item');
    }
  },
  async createTodoRelay(todoItem: ITodo) {
    if (todoItem) {
      let todo = { ...todoItem };
      todo.taskId = (new ObjectID()).toString();
      const result = await mgPool.collection('todos').insert(todo);
      const { taskId: id, isComplete, name, insertedId } = result.ops[0];
      return { id, isComplete, name, insertedId };
    } else {
      return Promise.reject('Invalid Todo item');
    }
  },
  async updateTodo(todoItem: ITodo) {
    if (todoItem) {
      const { result } = await mgPool.collection('todos').updateOne({ 'taskId': todoItem.taskId }, { $set: { 'isComplete': todoItem.isComplete, 'name': todoItem.name } }, { upsert: true });
      if (result.n) {
        const todos = await this.getTodosByIds([todoItem.taskId]);
        if (todos.length) {
          const { taskId: id, isComplete, name } = todos[0];
          return { id, isComplete, name };
        }
      } else {
        return Promise.reject('could not update the task');
      }

    } else {
      return Promise.reject('Invalid Todo Item');
    }
  },
  async toggleTodo(taskId, isComplete) {
    if (taskId && typeof isComplete === 'boolean') {
      const { result } = await mgPool.collection('todos').updateOne({ taskId }, { $set: { isComplete } }, { upsert: true });
      if (result.n) {
        const todos = await this.getTodosByIds([taskId]);
        if (todos.length) {
          const { taskId: id, isComplete, name } = todos[0];
          return { id, isComplete, name };
        }
      } else {
        return Promise.reject('could not update the task');
      }

    } else {
      return Promise.reject('taskId or isComplete is invalid');
    }
  },
  async deleteTodo(taskId: string = '') {
    if (taskId) {
      const { result } = await mgPool.collection('todos').remove({ taskId: { $eq: taskId } });
      return !!result.n;
    } else {
      return Promise.reject('Invalid taskId value');
    }
  }
});