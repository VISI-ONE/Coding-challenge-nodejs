const { queryDb } = require('../db');

const getAllVehicles = async (req, res, next) => {
  try {
    const query = 'SELECT * FROM vehicles';
    const vehicles = await queryDb(query);
    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllVehicles;
