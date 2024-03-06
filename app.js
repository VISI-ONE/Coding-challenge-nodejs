const express = require('express');
const bodyParser = require('body-parser');
const tenantsRouter = require('./routes/tenants');
const pairingRouter = require('./routes/pairing');
const vehiclesRouter = require('./routes/vehicles');
const { errorHandler } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// Express API routes for CRUD operations
app.use('/tenant', tenantsRouter);
app.use('/vehicles', vehiclesRouter);
app.use('/pairing', pairingRouter);

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
