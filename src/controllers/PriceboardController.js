const PriceboardService = require('../services/PriceboardService');
const Validator = require('../helpers/validator');

const PriceboardController = {

  // get all priceboards
  getAllPriceboards: async (req, res) => {
    try{
      res.status(200).json(await PriceboardService.getAllPriceboards());
    } 
    catch(error) {
      res.status(404).json({error: error.message});
    }
  },

  // get priceboards specific to a tenant
  getPriceboardsForTenant: async (req, res) => {
    try{
      if (Validator.validateId(req.params.tenant_id)) throw new Error('tenant_id is invalid!');
      res.status(200).json(await PriceboardService.getPriceboardsForTenant(req.params.tenant_id));
    } 
    catch(error) {
      res.status(404).json({error: error.message});
    }
  }
  
};

module.exports = PriceboardController;