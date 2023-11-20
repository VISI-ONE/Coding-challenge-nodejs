const router = require("express").Router();

const priceboardController = require('../controllers/priceboards.controllers');

router.get('/', priceboardController.getAllPriceboards);

router.get('/:tenantId/priceboards', priceboardController.getAllPriceboardsForTenant);


module.exports = router;