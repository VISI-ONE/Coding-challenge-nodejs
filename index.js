const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const dbName =
  process.env.NODE_ENV === 'test' ? 'priceboard.test.db' : 'priceboard.db';
const db = new sqlite3.Database(dbName);
// Express API routes for CRUD operations

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Get all priceboards for a specific tenant
app.get('/tenant/:tenantId/priceboards', async (req, res, next) => {
  try {
    const tenantId = req.params.tenantId;
    const query = 'SELECT * FROM priceboard WHERE tenant_id = ?';
    const rows = await dbAll(query, [tenantId]);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

// Get all vehicles for a specific tenant
app.get('/tenant/:tenantId/vehicles', async (req, res, next) => {
  try {
    const tenantId = req.params.tenantId;
    const query = 'SELECT * FROM vehicles WHERE tenant_id = ?';
    const rows = await dbAll(query, [tenantId]);

    res.status(200).json(rows);
  } catch (err) {
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

function dbAll(query, params) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
