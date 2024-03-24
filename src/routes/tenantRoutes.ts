import { Router } from 'express';
import { getTenantPriceboards } from '../controllers/tenantController';

const router = Router();

router.get('/tenant/:tenantId/priceboards', getTenantPriceboards);

export default router;