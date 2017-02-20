// @flow
import express from 'express';
import type { $Request, $Response } from 'express';
import GraphQLHTTP from 'express-graphql';
import schema from '../data/schema';

const app = express();
const PORT = process.env.PORT || 4000;

app.use('/graphql', (req: $Request, res: $Response) => {
  GraphQLHTTP({
    schema,
    graphiql: true
  })(req, res);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});