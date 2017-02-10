// @flow
import { GraphQLObjectType, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
  name: 'TotalVotes',
  fields: () => ({
    up: { type: GraphQLInt },
    down: { type: GraphQLInt }
  })
});