const express = require('express');
const { pairVehicleWithPriceboard } = require('../controllers');

const router = express.Router();

router.post('/pair', pairVehicleWithPriceboard);

module.exports = router;
