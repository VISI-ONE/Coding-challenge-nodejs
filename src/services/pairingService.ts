import db from '../providers/database';

export const getPairs = async (vehicleId: number, priceboardId: number) => {

    // I'm returning here on purpose. I could have checked if the next query finds any rows. 
    // If it does, then I could add the pair to the table. But I kept it simple and didn't do that 
    // because I can get the data directly from query without pushing the same data in the table

    return db('vehicle')
        .join('priceboard', 'vehicle.tenant_id', 'priceboard.tenant_id')
        .where('vehicle.id', vehicleId)
        .andWhere('priceboard.id', priceboardId);
};