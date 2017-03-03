// @flow
import { Db, ObjectID } from 'mongodb';
import { orderedFor } from '../src/util/index';

export default (mgPool: Db): IDBAccessLayer => ({
  async getTodosByIds(todoIds: ITodo[] = []) {

    if (todoIds.length === 0) {
      return this.getTodos();
    }
    let rows = await mgPool.collection('todos')
      .find({ taskId: { $in: todoIds } })
      .sort({createdAt: -1})
      .toArray();

    rows = rows.map(doc => {
      const { taskId: id, ...todoItem } = doc;
      return { ...todoItem, id };
    });

    return orderedFor(rows, todoIds, 'taskId', true);
  },
  async getTodos(numDoc = 0) {

    let documents;

    if (numDoc) {
      documents = await mgPool.collection('todos')
        .find({})
        .sort({createdAt: -1})
        .limit(numDoc)
        .toArray();

    } else {
      documents = await mgPool.collection('todos')
        .find({})
        .sort({createdAt: -1})
        .toArray();
    }

    documents = documents.map(doc => {
      const { taskId: id, ...todoItem } = doc;
      return { ...todoItem, id };
    });

    return documents;
  },
  async createTodo(newItem: ITodo) {
    if (newItem) {
      let todo = { ...newItem };
      todo.taskId = (new ObjectID()).toString();
      const result = await mgPool.collection('todos').insert(todo);
      const { taskId: id, ...todoItem } = result.ops[0];
      return {...todoItem,  id };
    } else {
      return Promise.reject('Invalid Todo item');
    }
  },
  async createTodoRelay(newItem: ITodo) {
    if (newItem) {
      let todo = { ...newItem };
      todo.taskId = (new ObjectID()).toString();
      const result = await mgPool.collection('todos').insert(todo);
      const { taskId: id, ...todoItem } = result.ops[0];
      return { id, ...todoItem };
    } else {
      return Promise.reject('Invalid Todo item');
    }
  },
  async updateTodo(todoItem: ITodo) {
    if (todoItem) {
      const { result } = await mgPool.collection('todos').updateOne({ 'taskId': todoItem.id }, { $set: { 'isComplete': todoItem.isComplete, 'name': todoItem.name } }, { upsert: true });
      if (result.n) {
        const todos = await this.getTodosByIds([todoItem.id]);
        if (todos.length) {
          const { taskId: id, ...todoItem } = todos[0];
          return { id, ...todoItem };
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
          const { taskId: id, ...todoItem } = todos[0];
          return { id, ...todoItem };
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