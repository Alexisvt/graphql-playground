import { GraphQLOptions } from 'apollo-server-core';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import {
  graphiqlExpress,
  graphqlExpress,
} from 'graphql-server-express';
import { loadSchemaFile } from './utils';

const app = express();
const PORT = 5687;

const GraphQLOptions: GraphQLOptions = {
  schema
};

app.use('/graphql', bodyParser.json(), graphqlExpress(GraphQLOptions));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => {
  console.log(`listening port: http://locahost:${PORT}`);
});