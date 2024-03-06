const { queryDb } = require('../db');

const getTenantPriceboards = async (req, res, next) => {
  try {
    const tenantId = req.params.tenantId;
    const query = 'SELECT * FROM priceboard WHERE tenant_id = ?';
    const rows = await queryDb(query, [tenantId]);
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
}

module.exports = getTenantPriceboards;
