const { getKnexClient } = require('../../database');

async function select({ tenantId }) {
    const db = getKnexClient();
    return db('priceboard').select('*').where('tenant_id', tenantId);
}

async function selectById({ priceBoardId }) {
    const db = getKnexClient();
    return db('priceboard').select('*').where('id', priceBoardId).first();
}

module.exports = { select, selectById };
