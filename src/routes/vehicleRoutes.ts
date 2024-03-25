import { Router } from 'express';
import { allVehicles } from '../controllers/vehicleController';
import { getPairByVehicleIdAndPriceboardId } from '../controllers/pairController';

const router = Router();

router.get('/', allVehicles);
router.get('/:vehicleId/priceboards/:priceboardId', getPairByVehicleIdAndPriceboardId);

export default router;