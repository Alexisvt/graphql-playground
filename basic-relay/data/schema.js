import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';


const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    counter: {
      type: GraphQLInt,
      resolve: () => 42
    },
    message: {
      type: GraphQLString,
      resolve: () => `hola mundo`
    }
  })
});

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    incrementCounter: {
      type: GraphQLInt,
      resolve: () => ++counter
    }
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType
});

export default schema;