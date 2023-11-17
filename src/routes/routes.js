const express = require('express');
const router = express.Router();

// Define routes for Priceboards
router.get('/tenant/:tenantId/priceboards', require('../controllers/PriceboardController').getAllByTenant);
router.get('/priceboards', require('../controllers/PriceboardController').getAll);

// Define routes for Vehicles
router.get('/tenant/:tenantId/vehicles', require('../controllers/VehicleController').getAllByTenant);
router.get('/vehicle/:id', require('../controllers/VehicleController').getById);
router.get('/vehicles', require('../controllers/VehicleController').getAll);

// Define routes for VehiclePriceboard
router.get('/vehicle-priceboard', require('../controllers/VehiclePriceboardController').getAll);
router.post('/pair-vehicle-priceboard', require('../controllers/VehiclePriceboardController').pairVehicleWithPriceboard);

module.exports = router;
