const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './priceboard.db',
  },
  useNullAsDefault: true,
});

module.exports = knex;