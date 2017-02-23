import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } from 'graphql';

export default new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    _id: { type: GraphQLID},
    taskId: { type: GraphQLString },
    name: { type: GraphQLString },
    isComplete: { type: GraphQLBoolean }
  })
});