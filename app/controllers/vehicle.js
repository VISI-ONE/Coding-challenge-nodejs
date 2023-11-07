const vehiclesService = require('../services/vehicles');

module.exports = async (req, res) => {
  try {
    const vehicles = await vehiclesService.getVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving vehicles. ' + error.message });
  }
};
