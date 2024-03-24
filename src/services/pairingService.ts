import db from '../providers/database';

export const getPairs = async (vehicleId: number, priceboardId: number) => {
    return db('vehicle')
        .join('priceboard', 'vehicle.tenant_id', 'priceboard.tenant_id')
        .where('vehicle.id', vehicleId)
        .andWhere('priceboard.id', priceboardId);
};