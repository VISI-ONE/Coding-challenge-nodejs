const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const router = require("./v1/router");


const app = express();
app.use(bodyParser.json());

router(app);
app.get('/healthCheck', (req, res) => res.sendStatus(200));


// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});