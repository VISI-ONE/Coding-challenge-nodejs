import db from '../providers/database';

export const getPriceboardsByTenant = async (tenantId: number) => {
    return db('priceboard').where({ tenant_id: tenantId });
};