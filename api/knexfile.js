module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './priceboard.db', // Change this to your SQLite database file path
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations', // Create this directory in your project
    },
  },
};
