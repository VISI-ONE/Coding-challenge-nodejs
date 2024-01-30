const { getKnexClient } = require('../../database');

async function selectById({ vehicleId }) {
    const db = getKnexClient();
    return db('vehicle').select('*').where('id', vehicleId).first();
}

async function select({ tenantId }) {
    const db = getKnexClient();
    return db('vehicle').select('*').where('tenant_id', tenantId);
}

async function update(vehicleId, { priceBoardId }) {
    const db = getKnexClient();
    return db('vehicle').where('id', vehicleId).update({ priceboard_id: priceBoardId });
}

module.exports = { select, update, selectById };
