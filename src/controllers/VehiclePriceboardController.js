const PriceboardService = require('../services/PriceboardService');
const VehicleService = require('../services/VehicleService');
const VehiclePriceboardService = require('../services/VehiclePriceboardService');

const VehiclePriceboardController = {
  getAll: async (req, res) => {
    try {
      const vehiclesPriceboards = await VehiclePriceboardService.getAll();
      res.status(200).json(vehiclesPriceboards);
    } catch (err) {
      res.status(500).json({ error: 'Error retrieving getAll: ' + err.message });
    }
  },

  pairVehicleWithPriceboard: async (req, res) => {
    try {
      const { vehicleId, priceboardId } = req.body;

      const priceboard = await PriceboardService.getById(priceboardId);
      const vehicle = await VehicleService.getById(vehicleId);

      if (!vehicle || !priceboard || vehicle.tenant_id !== priceboard.tenant_id) {
        throw new Error('Vehicle and priceboard do not belong to the same tenant');
      }

      await VehiclePriceboardService.pairVehicleWithPriceboard(vehicleId, priceboardId);

      res.status(200).json({ message: 'Vehicle paired with priceboard successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Error pairing vehicle with priceboard: ' + err.message });
    }
  },
};

module.exports = VehiclePriceboardController;
