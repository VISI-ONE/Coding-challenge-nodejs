const {getDatabase} = require('./database');

const priceboardsByTenantId = (tenantId) => {
  const query = 'SELECT * FROM priceboard WHERE tenant_id = ?';

  return new Promise((resolve, reject) => {
    let db;
    try {
      db = getDatabase();

      db.all(query, [tenantId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    } catch (error) {
      reject(error);
    } finally {
      if (db) {
        db.close();
      }
    }
  });
};

module.exports = {
  priceboardsByTenantId
}