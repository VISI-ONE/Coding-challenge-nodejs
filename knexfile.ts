import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './priceboard.db', // Change this to your SQLite database file path
  },
  useNullAsDefault: true,
  migrations: {
    directory: './migrations', // Ensure this directory exists in your project
  }
};

export default config;