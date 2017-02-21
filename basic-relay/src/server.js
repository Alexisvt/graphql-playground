// @flow
import express from 'express';
import GraphQLHTTP from 'express-graphql';
import schema from '../data/schema';
import path from 'path';

const PORT = process.env.PORT || 4000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/graphql', (req, res) => {
  GraphQLHTTP({
    schema,
    graphiql: true
  })(req, res);
});

app.listen(PORT);