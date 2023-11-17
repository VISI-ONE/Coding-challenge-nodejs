const priceboardsService = require('../services/priceboards');

module.exports = async (req, res) => {
  try {
    const tenantId = req && req.params ? req.params.tenantId : null;

    if (!tenantId || isNaN(tenantId)) {
      throw new Error('Invalid tenantId');
    }

    const priceboards = await priceboardsService.priceboardsByTenantId(tenantId);
    res.status(200).json(priceboards);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving priceboards. ' + error.message });
  }
};
