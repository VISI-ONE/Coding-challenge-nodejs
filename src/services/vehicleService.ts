import db from '../providers/database';

export const getVehicles = async (vehicleId: number | null = null): Promise<Vehicle[]> => {
    if (!vehicleId) {
        return db('vehicle').where({});
    }
    return db<Vehicle>('vehicle').where({ id: vehicleId });
};