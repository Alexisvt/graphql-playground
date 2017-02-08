// @flow
import { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import UserType from './user';
import pgdb from '../../database/pgdb';

export default new GraphQLObjectType({
  name: 'NameType',
  fields: () => {
    return {
      id: { type: GraphQLID },
      label: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      createdAt: { type: new GraphQLNonNull(GraphQLString) },
      createdBy: {
        type: new GraphQLNonNull(UserType),
        resolve(obj, args, {pgPool}) {
          return pgdb(pgPool).getUserById(obj.createdBy);
        }
      }
    };
  }
});