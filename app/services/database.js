const sqlite3 = require('sqlite3');

const getDatabase = () => new sqlite3.Database('priceboard.db');

module.exports = {
  getDatabase
};
