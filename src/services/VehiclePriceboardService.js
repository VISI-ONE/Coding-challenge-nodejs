const knex = require('../../dbconfig');

// get pairs specific to a tenant
exports.getPairsforTenant = async (tenant_id) => {
    return await knex("vehicle_priceboard")
    .join('vehicle', 'vehicle.id', 'vehicle_priceboard.vehicle_id')
    .join('tenant', 'tenant.id', 'vehicle.tenant_id')
    .join('priceboard', 'priceboard.id', 'vehicle_priceboard.priceboard_id')
    .select('vehicle_priceboard.*', 'vehicle.vehicle_name', 'priceboard.product_name', 'priceboard.price', 'tenant.name')
    .where({'vehicle.tenant_id': tenant_id});
};

// create pairs
exports.createPair = async (vehicle_id, priceboard_id) => {
    const found = await knex("vehicle_priceboard").where({vehicle_id, priceboard_id}).first();
    if(found) return true;
    return await knex("vehicle_priceboard").insert({vehicle_id, priceboard_id});
}

/*select vehicle_priceboard.*, vehicle.vehicle_name, priceboard.product_name, priceboard.price, tenant.name from vehicle_priceboard 
INNER JOIN vehicle ON vehicle_priceboard.vehicle_id = vehicle.id 
INNER JOIN tenant ON vehicle.tenant_id = tenant.id 
INNER JOIN priceboard ON priceboard.id = vehicle_priceboard.priceboard_id*/  