export const development = {
  client: "sqlite3",
  connection: {
    filename: "./priceboard.db", // Change this to your SQLite database file path
  },
  useNullAsDefault: true,
  migrations: {
    directory: "./migrations", // Create this directory in your project
  },
  seeds: {
    directory: "./seeds",
    timestampFilenamePrefix: true,
  },
};
