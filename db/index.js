const sqlite3 = require('sqlite3').verbose();

let db;

const connectDB = async () => {
  if (db) return db; 
  
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database('priceboard.db', (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      console.log('Connected to the priceboard database.');
      resolve(db);
    });
  });
};

module.exports = async () => {
  if (!db) {
    await connectDB();
  }
  return db; 
};
