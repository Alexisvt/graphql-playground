// @flow
import { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import UserType from './user';
import TotalVotes from './total-votes';

export default new GraphQLObjectType({
  name: 'Name',
  fields: () => {
    return {
      id: { type: GraphQLID },
      label: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      createdAt: { type: new GraphQLNonNull(GraphQLString) },
      createdBy: {
        type: new GraphQLNonNull(UserType),
        resolve(obj, args, {loaders}) {
          return loaders.usersByIds.load(obj.createdBy);
        }
      },
      totalVotes: {
        type: TotalVotes,
        resolve(obj, args, { loaders }) {
          return loaders.totalVotesByNameIds.load(obj.id);
        }
      }
    };
  }
});