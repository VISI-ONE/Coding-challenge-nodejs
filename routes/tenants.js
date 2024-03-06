const express = require('express');
const {getTenantPriceboards} = require('../controllers');
const { validateTenantId } = require('../middlewares');

const router = express.Router();

router.get('/:tenantId/priceboards', validateTenantId, getTenantPriceboards);

module.exports = router;
