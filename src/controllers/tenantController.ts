import { Request, Response } from 'express';
import { getPriceboardsByTenant } from '../services/priceboardService';
import { getPairs } from '../services/pairingService';

export const getTenantPriceboards = async (req: Request, res: Response) => {
    try {
        const tenantId = parseInt(req.params.tenantId);
        const priceboards = await getPriceboardsByTenant(tenantId);
        res.json(priceboards);
    } catch (err) {
        console.error('Error retrieving priceboards:', err);
        res.status(500).json({ error: 'Error retrieving priceboards' });
    }
};
