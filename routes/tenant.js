const express = require("express");
const router = express.Router();
const tenantController = require("../controllers/tenant");

// Get all priceboards for a specific tenant
router.get("/:tenantId/priceboards", tenantController.getPriceBoards);
router.get("/:tenantId/vehicles", tenantController.getVehicles);
router.patch("/:tenantId/pair", tenantController.pairVehicleToPriceboard);

module.exports = router;
