import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    connectionString: process.env.DB_CONNECTION_STRING || 'postgresql://user:secret@db/priceboard_db',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './migrations', // Ensure this directory exists in your project
  }
};

export default config;