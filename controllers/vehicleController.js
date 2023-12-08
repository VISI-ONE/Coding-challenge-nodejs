const vehicleService = require("../services/vehicleService");

exports.getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};

exports.getVehiclesByTenantId = async (req, res, next) => {
  try {
    const tenantId = req.params.tenantId;
    const vehicles = await vehicleService.getVehiclesByTenant(tenantId);
    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};
