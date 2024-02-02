const logger = require('../../logger');
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('priceboard.db');

// Get all priceboards for a specific tenant
router.route('/tenant/:tenantId/combined')

.get((req, res) => {
  const tenantId = req.params.tenantId;
  const query = `
    SELECT 
      p.id, 
      p.tenant_id, 
      p.price,
      v.brand,
      v.model,
      v.year
    FROM priceboard p
      INNER JOIN vehicles v ON p.tenant_id = v.tenant_id
    WHERE p.tenant_id = ? `;

  db.all(query, [tenantId], (err, rows) => {
    if (err) {
      logger.error('Error retrieving priceboards:', err);
      res.status(500).json({ error: 'Error retrieving priceboards' });
    } else {
      res.status(200).json(rows);
    }
  });
});


router.route('/tenant/:tenantId/priceboards')

.get((req, res) => {
  const tenantId = req.params.tenantId;
  const query = 'SELECT * FROM priceboard WHERE tenant_id = ?';

  db.all(query, [tenantId], (err, rows) => {
    if (err) {
      logger.error('Error retrieving priceboards:', err);
      res.status(500).json({ error: 'Error retrieving priceboards' });
    } else {
      res.status(200).json(rows);
    }
  });
});

module.exports = router;
