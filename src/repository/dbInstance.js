// CommonJS modules can always be imported via the default export

import sqlite3 from "sqlite3";

// import { Database } from "sqlite3";

// const db = new Database("priceboard.db");

// export default db;

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
        // console.error(err);
        reject(err);
      } else {
        // console.log(data);
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
