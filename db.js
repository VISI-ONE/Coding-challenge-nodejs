const sqlite3 = require('sqlite3');
const priceboard = new sqlite3.Database('priceboard.db');

module.exports = {
  priceboard
}
