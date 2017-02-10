// @flow
import ncSchema from '../schema';
import type { $Request, $Response } from 'express';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import nodeEnv from './util';
import postgresConfig from '../config/pg';
import pg from 'pg';
import { MongoClient, Logger } from 'mongodb';
import assert from 'assert';
import mongoConfig from '../config/mongo';
import pgDB from '../database/pgdb';
import mgDB from '../database/mdb';
import DataLoader from 'dataloader';

const mconfig = mongoConfig[nodeEnv.nodeEnv];
const app = express();
const pgConfig = postgresConfig[nodeEnv.nodeEnv];
const pgPool = new pg.Pool(pgConfig);
const pgdb = pgDB(pgPool);

MongoClient.connect(mconfig.url, (err, mPool) => {
  assert.equal(err, null);

  Logger.setLevel('debug');
  Logger.filter('class', ['Server']);

  app.use('/graphql', (req: $Request, res: $Response) => {

    const mgdb = mgDB(mPool);
    const loaders = {
      usersByIds: new DataLoader(pgdb.getUsersByIds),
      usersByApiKeys: new DataLoader(pgdb.getUsersByApiKeys),
      namesForContestIds: new DataLoader(pgdb.getNamesForContestIds),
      contestsForUserIds: new DataLoader(pgdb.getContestsForUserIds),
      totalVotesByNameIds: new DataLoader(pgdb.getTotalVotesByNameIds),
      mdb: {
        usersByIds: new DataLoader(mgdb.getUsersByIDs)
      },
      activitiesForUsersIds: new DataLoader(pgdb.getActivitiesForUserIds)
    };

    graphqlHTTP({
      schema: ncSchema,
      graphiql: true,
      context: { pgPool, mPool, loaders }
    })(req, res);
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Running on port ${PORT}`));
});

