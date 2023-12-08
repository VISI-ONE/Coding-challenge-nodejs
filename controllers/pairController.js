const { CustomError } = require("../middlewares/errorHandler");
const { errorMessages } = require("../utils/constants");
const vehicleService = require("../services/vehicleService");
const priceboardService = require("../services/priceBoardService");
const pairService = require("../services/pairService");

exports.pairVehicleWithPriceboard = async (req, res, next) => {
  try {
    const priceboardId = req.params.priceboardId;
    const vehicleId = req.params.vehicleId;

    const priceboard = await priceboardService.findOnePriceboard(priceboardId);
    if (!priceboard)
      throw new CustomError(errorMessages.priceboard_not_found_error, 404);

    const vehicle = await vehicleService.findOneVehicle(vehicleId);
    if (!vehicle)
      throw new CustomError(errorMessages.vehicle_not_found_error, 404);

    if (priceboard.tenant_id !== vehicle.tenant_id)
      throw new CustomError(errorMessages.pairing_error, 400);

    const response = await pairService.pairVehicleWithPriceboard(
      priceboardId,
      vehicleId
    );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getAllPairs = async (req, res, next) => {
  try {
    const pairs = await pairService.getAllPairs();
    res.status(200).json(pairs);
  } catch (error) {
    next(error);
  }
};
