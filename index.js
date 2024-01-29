const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const DB = require('./db');

const app = express();

app.use(bodyParser.json());

const dbName =
  process.env.NODE_ENV === 'test' ? 'priceboard.test.db' : 'priceboard.db';
const db = new DB(new sqlite3.Database(dbName));
// Express API routes for CRUD operations

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Get all priceboards for a specific tenant
app.get('/priceboards/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM priceboard WHERE id = ?';
    const priceboard = await db.get(query, [id]);

    if (!priceboard) {
      return res.status(404).json({ error: 'Price board not found' });
    }

    res.status(200).json(priceboard);
  } catch (err) {
    next(err);
  }
});

// Get all priceboards for a specific tenant
app.get('/tenant/:tenantId/priceboards', async (req, res, next) => {
  try {
    const { tenantId } = req.params;
    const query = 'SELECT * FROM priceboard WHERE tenant_id = ?';
    const rows = await db.all(query, [tenantId]);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

// Get all vehicles for a specific tenant
app.get('/tenant/:tenantId/vehicles', async (req, res, next) => {
  try {
    const { tenantId } = req.params;
    const query = 'SELECT * FROM vehicle WHERE tenant_id = ?';
    const rows = await db.all(query, [tenantId]);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

// Pair vehicle with a priceboard
app.post('/tenant/:tenantId/vehicle-priceboard', async (req, res, next) => {
  try {
    const { tenantId } = req.params;
    const { vehicleId, priceboardId } = req.body;

    if (vehicleId === undefined || priceboardId === undefined) {
      return res.status(400).json({ error: 'Payload is not valid' });
    }

    // verifying tenant exists
    const tenantQuery = 'SELECT * FROM tenant WHERE id = ?';
    const tenant = await db.get(tenantQuery, [tenantId]);

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    // verifying tenant has board
    const boardQuery =
      'SELECT * FROM priceboard WHERE id = ? AND tenant_id = ?';
    const board = await db.get(boardQuery, [priceboardId, tenantId]);

    if (!board) {
      return res
        .status(412)
        .json({ error: 'This price board does not belong to the tenant' });
    }

    // verifying tenant has vehicle
    const vehicleQuery = 'SELECT * FROM vehicle WHERE id = ? AND tenant_id = ?';
    const vehicle = await db.get(vehicleQuery, [vehicleId, tenantId]);

    if (!vehicle) {
      return res
        .status(412)
        .json({ error: 'This vehicle does not belong to the tenant' });
    }

    // pair vehicle with priceboard
    const updatePriceboardQuery =
      'UPDATE priceboard SET vehicle_id = ? WHERE id = ?';

    await db.update(updatePriceboardQuery, [vehicleId, priceboardId]);

    res.status(204).end();
  } catch (err) {
    console.log('--->', err);
    next(err);
  }
});

// Start the Express server
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
