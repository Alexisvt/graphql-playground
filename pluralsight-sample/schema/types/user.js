// @flow

import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import ContestType from './contest';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve(obj) {
        return `${obj.firstName} ${obj.lastName}`;
      }
    },
    email: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLString },
    contestsCount: {
      type: GraphQLInt,
      resolve(obj, args, { loaders }, { fieldName }) {
        return loaders.mdb.usersByIds.load(obj.id)
          .then(res => res[fieldName]);
      }
    },
    namesCount: {
      type: GraphQLInt,
      resolve(obj, args, { loaders }, { fieldName }) {
        return loaders.mdb.usersByIds.load(obj.id)
          .then(res => res[fieldName]);
      }
    },
    votesCount: {
      type: GraphQLInt,
      resolve(obj, args, { loaders }, { fieldName }) {
        return loaders.mdb.usersByIds.load(obj.id)
          .then(res => res[fieldName]);   
      }
    },
    contests: {
      type: new GraphQLList(ContestType),
      resolve(obj, args, { loaders }) {
        return loaders.contestsForUserIds.load(obj.id);
      }
    },
  }
});