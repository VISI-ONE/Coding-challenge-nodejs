const { queryDb } = require('../db');
 
const pairVehicleWithPriceboard = async (req, res, next) => {
  try {
    const { vehicleId, priceboardId } = req.body;

    const vehicleQuery = 'SELECT tenant_id FROM vehicles WHERE id = ?';
    const vehicle = await queryDb(vehicleQuery, [vehicleId]);
    const vehicleTenantId = vehicle[0].tenant_id;
console.log("FVGFGRTERG", vehicleTenantId)
    const priceboardQuery = 'SELECT tenant_id FROM priceboard WHERE id = ?';
    const priceboard = await queryDb(priceboardQuery, [priceboardId]);
    const priceboardTenantId = priceboard[0].tenant_id;

    if (vehicleTenantId !== priceboardTenantId) {
      return res.status(403).json({ error: 'Vehicle and priceboard belong to different tenants' });
    }

    const updateQuery = 'UPDATE vehicles SET priceboard_id = ? WHERE id = ?';
    await queryDb(updateQuery, [priceboardId, vehicleId]);

    res.status(200).json({ message: 'Vehicle successfully paired with priceboard' });
  } catch (error) {
    next(error);
  }
};

module.exports = pairVehicleWithPriceboard;
