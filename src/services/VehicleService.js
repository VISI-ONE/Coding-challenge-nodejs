const knex = require('../../dbconfig');

// get all vehicles
exports.getAllVehicles = async () => {
    return await knex('vehicle');
};

// get vehicles specific to a tenant
exports.getVehiclesForTanent = async (tenant_id) => {
  return await knex('vehicle').where({tenant_id});
};

// get a specific vehicle with vehicle id
exports.getSingleVehicle = async (id) => {
  return await knex('vehicle').where({id}).first();
};