const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const knex = require('knex');

const app = express();
app.use(bodyParser.json());

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: 'priceboard.db',
  },
});

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const getPriceboardsByTenantId = async (tenantId) => {
  return db('priceboard').where('tenant_id', tenantId);
};

// Express API routes for CRUD operations

// Get all priceboards for a specific tenant
app.get('/tenant/:tenantId/priceboards', async (req, res, next) => {
  try {
    const tenantId = req.params.tenantId;
    const priceboards = await getPriceboardsByTenantId(tenantId);
    res.status(200).json(priceboards);
  } catch (error) {
    next(error);
  };

});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
