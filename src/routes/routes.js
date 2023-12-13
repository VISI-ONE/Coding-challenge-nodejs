const express = require('express');
const router = express.Router();

const PriceboardController = require("../controllers/PriceboardController");
const VehicleController = require("../controllers/VehicleController");
const VehiclePriceboardController = require("../controllers/VehiclePriceboardController");

router.get('/priceboards', PriceboardController.getAllPriceboards);
router.get('/tenant/:tenant_id/priceboards', PriceboardController.getPriceboardsForTenant);
router.get('/vehicles', VehicleController.getAllVehicles);
router.get('/tenant/:tenant_id/vehicles', VehicleController.getVehiclesForTanent);
router.post('/createpair', VehiclePriceboardController.createPair);
router.get('/tenant/:tenant_id/pairs', VehiclePriceboardController.getPairsforTenant);

module.exports = router;