import { orderedFor } from '../lib/util';

export default mPool => ({
  async getUsersByIDs(userIds: number[]) {

    const rows = await mPool.collection('users')
      .find({ userId: { $in: userIds } })
      .toArray();
    
    return orderedFor(rows, userIds, 'userId', true);
  }
});