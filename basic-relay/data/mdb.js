// @flow
import { Db } from 'mongodb';
import { orderedFor } from '../src/util/index';

export default (mgPool: Db) => ({
  async getTodosByIds(todoIds = []) {

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
  }
});