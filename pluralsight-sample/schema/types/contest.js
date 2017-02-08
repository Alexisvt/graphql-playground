// @flow
import { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';
import ContestStatusType from './contest-status';
import pgdb from '../../database/pgdb';
import NameType from './name';

export default new GraphQLObjectType({
  name: 'ContestType',
  fields: {
    id: { type: GraphQLID },
    code: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    status: { type: new GraphQLNonNull(ContestStatusType) },
    names: {
      type: new GraphQLList(NameType),
      resolve(obj, args, {pgPool}) {
        return pgdb(pgPool).getNames(obj);
      }
    }
  }
});