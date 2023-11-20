const getDB = require('../db');

exports.getAllvehicules = async (req, res, next) => {
    try {
        const db = await getDB()
      const rows = await db.all('SELECT * FROM vehicules');
      res.status(200).json(rows);
    } catch (error) {
      next(error);
    }
  };