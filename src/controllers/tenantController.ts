import { Request, Response } from 'express';
import { getPriceboardsByTenant } from '../services/priceboardService';

export const getTenantPriceboards = async (req: Request, res: Response) => {
    try {
        const tenantId = parseInt(req.params.tenantId);
        const priceboards = await getPriceboardsByTenant(tenantId);
        res.json(priceboards);
    } catch (err) {
        // Push to sentry or something via error handler in index
        //console.error('Error retrieving priceboards:', err);
        res.status(500).json({ error: 'Error retrieving priceboards' });
    }
};
