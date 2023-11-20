const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('priceboard.db');

module.exports = db