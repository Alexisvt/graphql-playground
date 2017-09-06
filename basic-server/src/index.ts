
import * as bodyParser from 'body-parser';
import * as express from 'express';
import {
  graphiqlExpress,
  graphqlExpress,
} from 'graphql-server-express';
import graphQLOptions from './Data/SampleModel';
import { loadSchemaFile } from './utils';

const app = express();
const PORT = 5687;

app.use('/graphql', bodyParser.json(), graphqlExpress(graphQLOptions));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => {
  console.log(`listening port: http://locahost:${PORT}`);
});