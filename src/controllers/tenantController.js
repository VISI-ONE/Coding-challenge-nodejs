import { TenantService } from "../services/index.js";
import { throwErrorWithStatus } from "../utils/index.js";

export async function getOneTenantPriceboardsController(req, res, next) {
  const { tenantId } = req.params;

  try {
    const tenantWithId = await TenantService.getCountIfTenantExists(tenantId);

    if (tenantWithId.count === 0) {
      throwErrorWithStatus("Tenant is not found", 404);
    }

    const tenantPriceboards = await TenantService.getPriceBoards(tenantId);
    if (tenantPriceboards.length === 0) {
      throwErrorWithStatus("No priceboards found for this tenant", 404);
    }

    res.status(200).json(tenantPriceboards);
  } catch (err) {
    next(err);
  }
}
