const express = require("express");
const router = express.Router();
const tenantController = require("../controllers/tenant");

// Get all priceboards for a specific tenant
router.get("/:tenantId/priceboards", tenantController.getPriceBoards);

module.exports = router;
