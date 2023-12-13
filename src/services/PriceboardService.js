const knex = require('../../dbconfig');

// get all priceboards
exports.getAllPriceboards = async () => {
    return await knex('priceboard');
};

// get priceboards specific to a tenant
exports.getPriceboardsForTenant = async (tenant_id) => {
    return await knex('priceboard').where({tenant_id});
};

// get a specific priceboard with priceboard id
exports.getSinglePriceboard = async (id) => {
    return await knex('priceboard').where({id}).first();
};