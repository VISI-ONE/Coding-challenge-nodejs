const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const dbName =
  process.env.NODE_ENV === 'test' ? 'priceboard.test.db' : 'priceboard.db';
const db = new sqlite3.Database(dbName);
// Express API routes for CRUD operations

// Get all priceboards for a specific tenant
app.get('/tenant/:tenantId/priceboards', (req, res) => {
  const tenantId = req.params.tenantId;
  const query = 'SELECT * FROM priceboard WHERE tenant_id = ?';

  db.all(query, [tenantId], (err, rows) => {
    if (err) {
      console.error('Error retrieving priceboards:', err);
      res.status(500).json({ error: 'Error retrieving priceboards' });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Start the Express server
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
