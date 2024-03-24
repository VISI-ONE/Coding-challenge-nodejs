import { Request, Response } from 'express';
import { getPairs } from '../services/pairingService';

export const getPairByVehicleIdAndPriceboardId = async (req: Request, res: Response) => {
    try {
        const vehicleId = parseInt(req.params.vehicleId);
        const priceboardId = parseInt(req.params.priceboardId);

        const priceboards = await getPairs(vehicleId, priceboardId);

        if (priceboards.length === 0) {
            res.status(500).json({ error: 'cannot pair vehicle and priceboard' });
        }

        res.json(priceboards);
    } catch (err) {
        console.error('Error retrieving priceboards:', err);
        res.status(500).json({ error: 'Error retrieving priceboards' });
    }
};