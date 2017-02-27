// @flow
import express from 'express';
import GraphQLHTTP from 'express-graphql';
import schemaBuilder, { rootFactory } from './schema/index';
import path from 'path';
import mongoConfig from '../config/mongo';
import { MongoClient, Logger } from 'mongodb';
import assert from 'assert';
import mongoBusinessLayer from '../data/mdb';
import DataLoader from 'dataloader';
import { createSchemaJsonFile } from './util/index';

import { buildSchema, graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';

const PORT = process.env.PORT || 4000;
const app = express();
const {NODE_ENV = 'development'} = process.env;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(mongoConfig.url, async (err, mPool) => {
  assert.equal(err, null);

  const mdb = mongoBusinessLayer(mPool);

  const schema = await schemaBuilder();

  app.use('/graphql', (req, res) => {
    GraphQLHTTP({
      schema,
      rootValue: rootFactory(mdb),
      graphiql: true,
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