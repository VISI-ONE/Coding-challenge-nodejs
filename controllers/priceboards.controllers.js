const getDB = require('../db');

exports.getAllPriceboardsForTenant = async (req, res, next) => {
  try {
    const db = await getDB(); 
    const tenantId = req.params.tenantId;

    db.all('SELECT * FROM priceboard WHERE tenant_id = ?', [tenantId], (err, rows) => {
      if (err) {
        next(err); 
      } else {
        res.status(200).json(rows);
      }
    });
  } catch (error) {
    next(error); 
  }
};

exports.getAllPriceboards = async (req, res, next) => {
    try {
        const db = await getDB()
      const rows = await db.all('SELECT * FROM priceboard');
      res.status(200).json(rows);
    } catch (error) {
      next(error);
    }
  };
