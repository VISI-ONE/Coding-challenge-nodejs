const express = require("express");
const priceboardController = require("./controllers/priceBoardController");
const vehicleController = require("./controllers/vehicleController");
const pairController = require("./controllers/pairController");

const router = express.Router();

//Priceboard routes
router.get(
  "/tenant/:tenantId/priceboards",
  priceboardController.getPriceboardsByTenant
);

//Vehicle routes
router.get("/vehicles", vehicleController.getAllVehicles);

router.get(
  "/tenant/:tenantId/vehicles",
  vehicleController.getVehiclesByTenantId
);

//Pair routes
router.post(
  "/pair/:vehicleId/:priceboardId",
  pairController.pairVehicleWithPriceboard
);

router.get("/pairs", pairController.getAllPairs);

module.exports = router;
