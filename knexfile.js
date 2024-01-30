const commonConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    directory: './migrations',
  },
};

module.exports = {
  test: {
    connection: {
      filename: './priceboard-test.db',
    },
    ...commonConfig,
  },
  development: {
    connection: {
      filename: './priceboard-dev.db',
    },
    seeds: {
      directory: './seeds',
    },
    ...commonConfig,
  },
  production: {
    connection: {
      filename: './priceboard-prod.db',
    },
    seeds: {
      directory: './seeds',
    },
    ...commonConfig,
  },
};
