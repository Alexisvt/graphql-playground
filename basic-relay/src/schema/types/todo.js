import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import {
  connectionDefinitions
} from 'graphql-relay';

export const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    isComplete: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    createdAt: {
      type: GraphQLString,
      resolve: (obj) => new Date(obj.createdAt).toISOString()
    }
  })
});

export const TodoConnectionType = connectionDefinitions({
  name: 'Todo',
  nodeType: TodoType
});