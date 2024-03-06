const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'priceboard.db');
const db = new sqlite3.Database(dbPath);

const queryDb = (query, params) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = { db, queryDb };
