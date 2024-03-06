const express = require('express');
const { getAllVehicles } = require('../controllers');

const router = express.Router();

router.get('/', getAllVehicles);

module.exports = router;
