import { Request, Response } from 'express';
import { getVehicles } from '../services/vehicleService';

export const allVehicles = async (req: Request, res: Response) => {
    try {
        const vehicles = await getVehicles();
        res.json(vehicles);
    } catch (err) {
        //Push to sentry or something via error handler in index
        //console.error('Error retrieving vechiles:', err);
        res.status(500).json({ error: 'Error retrieving vehicles' });
    }
};