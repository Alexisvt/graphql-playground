import * as bodyParser from 'body-parser';
import * as express from 'express';
import { graphiqlExpress } from 'graphql-server-express';

const app = express();
const PORT = 5687;

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => {
  console.log(`listening port: ${PORT}`);
});
