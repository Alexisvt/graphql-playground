// @flow
import ncSchema from '../schema';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import nodeEnv from './util';
import postgresConfig from '../config/pg';
import pg from 'pg';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import mongoConfig from '../config/mongo';

const mconfig = mongoConfig[nodeEnv.nodeEnv];
const app = express();
const pgConfig = postgresConfig[nodeEnv.nodeEnv];
const pgPool = new pg.Pool(pgConfig);

MongoClient.connect(mconfig.url, (err, mPool) => {
  assert.equal(err, null);
  
  const PORT = process.env.PORT || 4000;

  // endpoint route
  app.use('/graphql', graphqlHTTP({
    schema: ncSchema,
    graphiql: true,
    context: { pgPool, mPool }
  }));

  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
});

