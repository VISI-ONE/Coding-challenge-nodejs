const router = require("express").Router();

const vehiculesController = require('../controllers/vehicules.controllers');

router.get('/', vehiculesController.getAllvehicules);


module.exports = router;