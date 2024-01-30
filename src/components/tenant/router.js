const { Router } = require('express');
const { fetchPriceBaordsController } = require('./fetchPriceBaordsController');
const { fetchVehiclesController } = require('./fetchVehiclesController');
const { pairController } = require('./pairController');

const router = Router();

// Get all priceboards for a specific tenant
router.get('/:tenantId/priceboards', fetchPriceBaordsController);
router.get('/:tenantId/vehicles', fetchVehiclesController);
router.patch('/:tenantId/vehicle-pair', pairController);
module.exports = router;
