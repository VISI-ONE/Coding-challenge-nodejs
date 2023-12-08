const Database = require("../database");

const db = new Database("priceboard.db");

exports.pairVehicleWithPriceboard = async (priceboardId, vehicleId) => {
  const query =
    "INSERT INTO priceboard_vehicle (priceboard_id, vehicle_id) VALUES (?,?)";
  return db.query(query, [priceboardId, vehicleId]);
};

exports.getAllPairs = async () => {
  const query = "SELECT * FROM priceboard_vehicle";
  return db.query(query);
};
