// @flow
import express from 'express';
import GraphQLHTTP from 'express-graphql';
import schema from './schema/schema';
import path from 'path';
import mongoConfig from '../config/mongo';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import mongoBusinessLayer from '../data/mdb';
import { createSchemaJsonFile } from './util/index';

const PORT = process.env.PORT || 4000;
const app = express();
const { NODE_ENV = 'development' } = process.env;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(mongoConfig.url, async (err, mPool) => {
  assert.equal(err, null);

  const mdb = mongoBusinessLayer(mPool);

  app.use('/graphql', (req, res) => {
    GraphQLHTTP({
      schema,
      graphiql: true,
      context: { mdb }
    })(req, res);
  });

  if (NODE_ENV && NODE_ENV == 'development') {
    // TODO: complete implementation
    createSchemaJsonFile(schema).then((m) => console.log(m), (e) => console.error(e));
  }

});

app.listen(PORT, () => {
  console.log(`Running on localhost:${PORT}`);
});