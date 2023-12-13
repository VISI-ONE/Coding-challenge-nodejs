const VehiclePriceboardService = require('../services/VehiclePriceboardService');
const VehicleService = require('../services/VehicleService');
const PriceboardService = require('../services/PriceboardService');
const Validator = require('../helpers/validator');

const VehiclePriceboardController = {

  // get pairs specific to a tenant
  getPairsforTenant: async (req, res) => {
    try{
      if (Validator.validateId(req.params.tenant_id)) throw new Error('tenant_id is invalid!');
      const vehiclesPriceboards = await VehiclePriceboardService.getPairsforTenant(req.params.tenant_id);
      res.status(200).json(vehiclesPriceboards);
    } 
    catch(error){
      res.status(404).json({error: error.message});
    }
  },

  // create pairs
  createPair: async (req, res) => {
    //console.log(req.body);
    try {
      if(!req.body.vehicle_id || !req.body.price_board_id) throw new Error('vehicle_id and/or price_board_id missing!');
      
      const vehicle_id = req.body.vehicle_id;
      const price_board_id = req.body.price_board_id;

      const vehicle = await VehicleService.getSingleVehicle(vehicle_id);
      const priceboard = await PriceboardService.getSinglePriceboard(price_board_id);
      
      if (vehicle.tenant_id !== priceboard.tenant_id) throw new Error('ids mismatch found!');

      await VehiclePriceboardService.createPair(vehicle_id, price_board_id);
      res.status(201).json({'status': 'pair created successfully'});
    } 
    catch (error) {
      res.status(404).json({error: error.message});
    }
  }
  
};

module.exports = VehiclePriceboardController;