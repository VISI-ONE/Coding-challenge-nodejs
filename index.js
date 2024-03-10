const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = new sqlite3.Database('priceboard.db');
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

app.get('/vehicles', (req, res) => {
  const query = 'SELECT * FROM vehicle';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error retrieving vehicles:', err);
      res.status(500).json({ error: 'Error retrieving vehicles' });
    } else {
      res.status(200).json(rows);
    }
  })
})

app.get('/vehicle/:vehicleId/priceboards', (req, res) => {
  const vehicleId = req.params.vehicleId

  const query = `SELECT *
    from priceboard
    LEFT JOIN vehicle
    ON priceboard.tenant_id= vehicle.tenant_id
    WHERE vehicle.id = ?`

  db.all(query, [vehicleId], (err, rows) => {
    if (err) {
      console.error('Error retrieving vehicles:', err);
      res.status(500).json({ error: 'Error retrieving vehicles' });
    } else {
      res.status(200).json(rows);
    }
  })
})

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app
