import { TenantService } from "../services/index.js";
import { throwErrorWithStatus } from "../utils/index.js";

// export async function checkIfTenantExists(tenantId) {
//           // handle tenant does not exist -> maybe convert to a middleware

// const isValidTenant = await TenantService.getCountIfTenantExists(tenantId);
// if (!isValidTenant) {
//   return res.status(404).json({ message: "Tenant does not exist" });
// }
// }

export async function getOneTenantPriceboardsController(req, res, next) {
  const { tenantId } = req.params;

  try {
    // handle tenant does not exist -> maybe convert to a middleware
    const tenantWithId = await TenantService.getCountIfTenantExists(tenantId);
    // console.log(tenantWithId.count > 0);
    if (tenantWithId.count === 0) {
      //   return res.status(404).json({ message: "Tenant does not exist" });
      throwErrorWithStatus("Tenant is not found", 404);
    }

    const tenantPriceboards = await TenantService.getPriceBoards(tenantId);
    if (tenantPriceboards.length === 0) {
      //   return res
      //     .status(404)
      //     .json({ message: "No priceboards found for this tenant" });

      throwErrorWithStatus("No priceboards found for this tenant", 404);
    }
    // console.log(tenantPriceboards);
    res.status(200).json(tenantPriceboards);
  } catch (err) {
    // console.log(err, "CTRL");
    next(err);
    // console.error("Error retrieving priceboards:", err);
    // res.status(500).json({ error: "Error retrieving priceboards" });
  }
}
