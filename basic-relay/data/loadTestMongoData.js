// @flow
import { MongoClient, ObjectID } from 'mongodb';
import mongoConfig from '../config/mongo';
import assert from 'assert';

MongoClient.connect(mongoConfig.url, async (err, db) => {
  assert.equal(null, err);

  const response = await db.collection('todos').insertMany([
    {
      taskId: (new ObjectID()).toString(),
      name: 'Learn JSX',
      isComplete: true
    },
    {
      taskId: (new ObjectID()).toString(),
      name: 'Build an Awesome App',
      isComplete: false
    },
    {
      taskId: (new ObjectID()).toString(),
      name: 'Ship It',
      isComplete: false
    }
  ]);

  console.log(response);
  db.close();
});