import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';
import TodoType from './types/todo';
import mdb from '../../data/mdb';


const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    todos: {
      type: new GraphQLList(TodoType),
      args: {
        todoIdList: {
          type: new GraphQLList(GraphQLString),
          description: 'list of taskIds'
        }
      },
      description: 'list of all todos',
      resolve: (obj, {todoIdList}, {mPool}) => mdb(mPool).getTodosByIds(todoIdList)
    }
  })
});

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    incrementCounter: {
      type: GraphQLInt,
      resolve: (parentObj, args, {mgPool}) => { }
    }
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType
});

export default schema;