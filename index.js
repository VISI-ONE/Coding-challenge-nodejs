// Dependencies
const express = require('express');
// const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

// Initialize app
const app = express();

// Middlewares
app.use(bodyParser.json());

// Database connection
require('./db');

// Import routes
const priceboardsRoutes = require('./routes/priceboards.routes.js');
const vehiculesRoutes = require('./routes/vehicules.routes.js');

// Use routes
app.use('/tenant', priceboardsRoutes);
app.use('/vehicules', vehiculesRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
