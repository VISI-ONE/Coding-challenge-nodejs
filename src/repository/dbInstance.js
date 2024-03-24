// CommonJS modules can always be imported via the default export

import sqlite3 from "sqlite3";

let db;

function init() {
  db = new sqlite3.Database("./priceboard.db", (err) => {
    if (err) {
      console.error("Error connecting to database:", err.message);
      process.exit(1);
    }
    console.log("Connected to database");
  });
}

const executeQuery = (method, sqlQuery, params) => {
  return new Promise((resolve, reject) => {
    const queryCallback = (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    };

    if (params !== undefined) {
      db[method](sqlQuery, params, queryCallback);
    } else {
      db[method](sqlQuery, queryCallback);
    }
  });
};

export default {
  init,
  getOne: (sqlQuery, params) => executeQuery("get", sqlQuery, params),
  getAll: (sqlQuery, params) => executeQuery("all", sqlQuery, params),
};
