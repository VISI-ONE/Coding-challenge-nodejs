const VehicleService = require('../services/VehicleService');
const Validator = require('../helpers/validator');

const VehicleController = {
  
  // get all vehicles
  getAllVehicles: async (req, res) => {
    try {
        res.status(200).json(await VehicleService.getAllVehicles());
    } 
    catch (error) {
        res.status(404).json({error: error.message});
    }
  },
  
  // get vehicles specific to a tenant
  getVehiclesForTanent: async (req, res) => {
    try {
      if (Validator.validateId(req.params.tenant_id)) throw new Error('tenant_id is invalid!');
      res.status(200).json(await VehicleService.getVehiclesForTanent(req.params.tenant_id));
    } 
    catch (error) {
      res.status(404).json({error: error.message});
    }
  }

};

module.exports = VehicleController;