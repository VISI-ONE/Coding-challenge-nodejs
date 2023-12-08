const Database = require("../database");

const db = new Database("priceboard.db");

exports.getAllVehicles = async () => {
  const query = "SELECT * FROM vehicle";
  return db.query(query);
};

exports.getVehiclesByTenant = async (tenantId) => {
  const query = "SELECT * FROM vehicle WHERE tenant_id = ?";
  return db.query(query, [tenantId]);
};

exports.findOneVehicle = async (id) => {
  const query = "SELECT * FROM vehicle WHERE id = ?";
  const result = await db.query(query, [id]);

  return result.length > 0 ? result[0] : null;
};