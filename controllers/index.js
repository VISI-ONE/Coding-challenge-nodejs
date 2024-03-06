const getTenantPriceboards = require("./tenant-controller")
const getAllVehicles = require("./vehicle-controller")
const pairVehicleWithPriceboard = require("./pairing-controller")

module.exports = {
  getTenantPriceboards,
  getAllVehicles,
  pairVehicleWithPriceboard
}
