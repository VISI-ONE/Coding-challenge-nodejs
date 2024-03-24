import { Router } from "express";

import { getOneTenantPriceboardsController } from "../controllers/index.js";

export const tenantRouter = Router();

// Get all priceboards for a specific tenant
tenantRouter.get(
  "/tenant/:tenantId/priceboards",
  getOneTenantPriceboardsController,
);
