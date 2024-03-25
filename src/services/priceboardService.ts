import db from '../providers/database';

export const getPriceboardsByTenant = async (tenantId: number): Promise<Priceboard[]> => {
    return db<Priceboard>('priceboard').where({ tenant_id: tenantId });
};