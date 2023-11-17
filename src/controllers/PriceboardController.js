const PriceboardService = require('../services/PriceboardService');

const PriceboardController = {
  getAllByTenant: async (req, res) => {
    try {
      const tenantId = req.params.tenantId;
      if (!tenantId || isNaN(tenantId)) {
        throw new Error('Invalid tenantId');
      }
      const priceboards = await PriceboardService.getAllByTenant(tenantId);
      res.status(200).json(priceboards);
    } catch (err) {
      res.status(500).json({ error: 'Error retrieving priceboards' + err.message});
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id || isNaN(id)) {
        throw new Error('Invalid id');
      }
      const priceboard = await PriceboardService.getById(id);
      res.status(200).json(priceboard);
    } catch (err) {
      res.status(500).json({ error: 'Error retrieving vehicle' + err.message});
    }
  },

  getAll: async (req, res) => {
    try {
      const priceboards = await PriceboardService.getAll();
      res.status(200).json(priceboards);
    } catch (err) {
      res.status(500).json({ error: 'Error retrieving all priceboards: ' + err.message });
    }
  },
};

module.exports = PriceboardController;
