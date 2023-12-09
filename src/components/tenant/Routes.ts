import { Router } from "express";
import GetTenantPriceboardsController from "./GetTenantPriceboardsController";
import validate from "../../validate";
import { getTenantPriceboardsSchema } from "./ValidationSchema";

const router = Router();

router.route('/:id/priceboards').get(validate(getTenantPriceboardsSchema), GetTenantPriceboardsController);

export default router;