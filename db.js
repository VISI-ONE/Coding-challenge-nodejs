class DB {
  constructor(db) {
    this.db = db;
  }

  all(query, params) {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  get(query, params) {
    return new Promise((resolve, reject) => {
      this.db.get(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  update(query, params) {
    return new Promise((resolve, reject) => {
      this.db.run(query, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = DB;
