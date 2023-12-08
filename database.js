const sqlite3 = require('sqlite3');

class Database {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath);
  }

  query(query, params) {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = Database;