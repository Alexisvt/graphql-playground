// @flow
import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import UserType from './types/user';
import AddContestMutation from './mutations/add-contest';

// The root query type is where in the data graph
// we can start asking questions
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    me: {
      type: UserType,
      description: 'The current user identified by an api key',
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (obj, args, {loaders}) => {
        return loaders.usersByApiKeys.load(args.key);
      }
    }
  }
});

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    AddContest: AddContestMutation
  })
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

export default ncSchema;
