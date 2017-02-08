// @flow

import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import pgdb from '../../database/pgdb';
import mdb from '../../database/mdb';
import ContestType from './contest';

export default new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID },
    firstName: {type: GraphQLString},
    lastName: { type: GraphQLString},
    fullName: { 
      type: GraphQLString,
      resolve(obj) {
        return `${obj.firstName} ${obj.lastName}`;
      }
    },
    email: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: {type: GraphQLString},
    contestsCount: {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName }) {
        return mdb(mPool).getCounts(obj, fieldName);
      }
    },
    namesCount: {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName }) {
        return mdb(mPool).getCounts(obj, fieldName);
      }
    },
    votesCount: {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName }) {
        return mdb(mPool).getCounts(obj, fieldName);
      }
    },
    contests: {
      type: new GraphQLList(ContestType),
      resolve(obj, args, { pgPool }) {
        return pgdb(pgPool).getContests(obj);
      }
    },
  }
});