const db = require("../database/config/db");

const getAll = async () => {
  try {
    return await db("vehicle_priceboard");
  } catch (error) {
    console.error("Error in VehicleService:", error);
    throw error;
  }
};

const pairVehicleWithPriceboard = async (vehicleId, priceboardId) => {
  try {
    return await db("vehicle_priceboard").insert({
      vehicle_id: vehicleId,
      priceboard_id: priceboardId,
    });
  } catch (error) {
    console.error("Error in VehicleService:", error);
    throw error;
  }
};

module.exports = {
  getAll,
  pairVehicleWithPriceboard,
};
