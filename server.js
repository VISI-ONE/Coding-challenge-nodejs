const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});