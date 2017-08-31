import express from 'express';
import expressGraphQL from 'express-graphql';

const app = express();
const PORT = 5687;

app.use('/graphql', expressGraphQL({
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`listening port: ${PORT}`);
});
