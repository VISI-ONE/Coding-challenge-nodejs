const {getDatabase} = require('./database');

const getVehicles = () => {
  const query = 'SELECT * FROM vehicles';

  return new Promise((resolve, reject) => {
    let db;
    try {
      db = getDatabase();

      db.all(query, [], (err, rows) => {
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
  getVehicles
}