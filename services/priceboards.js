const db = require('../database/db');

const getPriceboardsByTenantId = async (tenantId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM priceboard WHERE tenant_id = ?';

    db.all(query, [tenantId], (err, rows) => {
      if (err) {
        console.error('Error retrieving priceboards:', err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  })
};

module.exports = {
  getPriceboardsByTenantId
};
