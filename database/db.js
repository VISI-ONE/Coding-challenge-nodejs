const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('priceboard.db', (err) => {
  if (err) {
    throw err;
  }
})

module.exports = db;