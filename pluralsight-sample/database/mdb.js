export default mPool => ({
  async getCounts(user: Object, countsField: string) {
    const userCounts = await mPool.collection('users').findOne({ userId: user.id });

    return userCounts[countsField];
  }
});