const Database = require("../database");

const db = new Database("priceboard.db");

exports.getPriceboardsByTenant = async (tenantId) => {
  const query = "SELECT * FROM priceboard WHERE tenant_id = ?";
  return db.query(query, [tenantId]);
};

exports.findOnePriceboard = async (id) => {
  const query = "SELECT * FROM priceboard WHERE id = ?";
  const result = await db.query(query, [id]);

  return result.length > 0 ? result[0] : null;
};
