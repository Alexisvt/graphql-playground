import * as bodyParser from 'body-parser';
import * as express from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';

import { getSchemaObject } from './models';

const app = express();
const PORT = 2144;

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(async (req, res) => {
    return await getSchemaObject();
  }),
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

app.listen(PORT, () => {
  console.log(`listening port: http://localhost:${PORT}/graphiql`);
});
