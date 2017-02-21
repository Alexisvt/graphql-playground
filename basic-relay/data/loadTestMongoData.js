// @flow
import { MongoClient } from 'mongodb';
import assert from 'assert';

MongoClient.connect('mongodb://localhost:27017/todos', async (err, db) => {
  assert.equal(null, err);

  const response = await db.collection('todos').insertMany([
    {
      name: 'Learn JSX',
      isComplete: true
    },
    {
      name: 'Build an Awesome App',
      isComplete: false
    },
    {
      name: 'Ship It',
      isComplete: false
    }
  ]);

  console.log(response);
  db.close();
});