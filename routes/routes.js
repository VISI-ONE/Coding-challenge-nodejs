const express = require('express');
const priceboardService = require('../services/priceboards');
const vehiclesService = require('../services/vehicles');

const router = express.Router();

router.get('/tenants/:tenantId/priceboards', async (req, res) => {
  const tenantId = req.params.tenantId;
  console.log('tenantid..', tenantId);
  try {
    const priceboards = await priceboardService.getPriceboardsByTenantId(tenantId);
    res.status(200).json(priceboards);
  } catch(err) {
    res.status(500).json({"Error": err.message});
  }
});

router.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await vehiclesService.getVehicles();

    res.status(200).json(vehicles);
  } catch(err) {
    res.status(500).json({"Error": err.message});
  }
});

module.exports = router;