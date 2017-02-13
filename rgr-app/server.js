// @flow
import express from 'express';

let app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));