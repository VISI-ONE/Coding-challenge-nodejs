const VehicleService = require('../services/VehicleService');

const VehicleController = {
  getAllByTenant: async (req, res) => {
    try {
      const tenantId = req.params.tenantId;
      if (!tenantId || isNaN(tenantId)) {
        throw new Error('Invalid tenantId');
      }
      const vehicles = await VehicleService.getAllByTenant(tenantId);
      res.status(200).json(vehicles);
    } catch (err) {
      res.status(500).json({ error: 'Error retrieving vehicles' + err.message});
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id || isNaN(id)) {
        throw new Error('Invalid id');
      }
      const vehicle = await VehicleService.getById(id);
      res.status(200).json(vehicle);
    } catch (err) {
      res.status(500).json({ error: 'Error retrieving vehicle' + err.message});
    }
  },

  getAll: async (req, res) => {
    try {
      const vehicles = await VehicleService.getAll();
      res.status(200).json(vehicles);
    } catch (err) {
      res.status(500).json({ error: 'Error retrieving all vehicles: ' + err.message });
    }
  },
};

module.exports = VehicleController;
