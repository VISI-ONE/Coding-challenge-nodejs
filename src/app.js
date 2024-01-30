const router = require('./router');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({ message: 'something went wrong' });
});

module.exports = app;
