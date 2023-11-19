const db = require('../database/db');

const getVehicles = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM vehicle';

    db.all(query, [], (err, rows) => {
      if (err) {
        console.error('Error retrieving vehicles:', err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  })
};

module.exports = {
  getVehicles
};
