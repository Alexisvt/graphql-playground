// @flow
import express from 'express';
import GraphQLHTTP from 'express-graphql';
import schema from './schema/';
import path from 'path';
import mongoConfig from '../config/mongo';
import { MongoClient, Logger } from 'mongodb';
import assert from 'assert';
import mongoBusinessLayer from '../data/mdb';
import DataLoader from 'dataloader';
import { loadSchemaFile } from './util/index';

import { buildSchema } from 'graphql';

const PORT = process.env.PORT || 4000;
const app = express();
const {NODE_ENV = 'development'} = process.env;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(mongoConfig.url, async (err, mPool) => {
  assert.equal(err, null);

  const mdb = mongoBusinessLayer(mPool);

  const eSchema = await loadSchemaFile('sample.gql');

  console.log(eSchema);

  const schemaString = buildSchema(eSchema);

  const root = {
    todos({todoIdList = []}) {
      console.log(todoIdList);
      return mdb.getTodosByIds(todoIdList);
    }
  };

  // if (NODE_ENV == 'development') {
  //   Logger.setLevel('debug');
  //   Logger.filter('class', ['Cursor']);
  // }

  const loaders = {
    mdb: {
      todosByIds: mdb.getTodosByIds
    }
  };

  app.use('/graphql', (req, res) => {
    GraphQLHTTP({
      schema: schemaString,
      rootValue: root,
      graphiql: true,
    })(req, res);
  });
  // app.use('/graphql', (req, res) => {
  //   GraphQLHTTP({
  //     schema,
  //     graphiql: true,
  //     context: { mPool, loaders }
  //   })(req, res);
  // });

});

app.listen(PORT, () => {
  console.log(`Running on localhost:${PORT}`);
});