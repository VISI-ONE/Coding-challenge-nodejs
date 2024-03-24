import { VehicleService } from "../services/index.js";
import { TenantService } from "../services/index.js";

import { throwErrorWithStatus } from "../utils/index.js";

const validateId = async (idStr, errorMessage, statusCode) => {
  const id = parseInt(idStr);

  if (isNaN(id)) {
    throwErrorWithStatus(errorMessage, statusCode);
  }

  return id;
};

export const handleWithVehicleId = async (vehicleId, res) => {
  const validVehicleId = await validateId(
    vehicleId,
    "vehicle_id must be a number",
    400,
  );
  const vehicle = await VehicleService.getOneVehicle(validVehicleId);

  // console.log(vehicle);
  if (!vehicle) throwErrorWithStatus("Vehicle does not exist", 404);
  return res.status(200).json(vehicle);
};

const verifyTenantExist = async (tenantId) => {
  const tenantWithId = await TenantService.getCountIfTenantExists(tenantId);
  // console.log(tenantWithId);
  if (tenantWithId.count === 0) {
    throwErrorWithStatus("Tenant is not found", 404);
  }
  return tenantId;
};

export const handleWithTenantId = async (tenantId, res) => {
  const validTenantId = await validateId(
    tenantId,
    "tenant_id must be a number",
    400,
  );

  const verifiedTenant = await verifyTenantExist(validTenantId);
  const vehicles = await VehicleService.getVehiclesByTenant(verifiedTenant);
  if (!vehicles) throwErrorWithStatus("Vehicle does not exist", 404);
  return res.status(200).json(vehicles);
};

export const handleWithoutId = async (res) => {
  const vehicles = await VehicleService.getAllVehicles();
  return res.status(200).json(vehicles);
};

export async function getVehiclesController(req, res, next) {
  try {
    const { vehicle_id = null, tenant_id = null } = req.query;
    if (vehicle_id && tenant_id)
      throwErrorWithStatus(
        "Please provide either vehicle_id or tenant_id, not both",
        400,
      );
    if (vehicle_id) return await handleWithVehicleId(vehicle_id, res);
    if (tenant_id) return await handleWithTenantId(tenant_id, res);
    return await handleWithoutId(res);
  } catch (err) {
    next(err);
  }
}

export async function pairVehicleWithPriceboardController(req, res, next) {
  const { vehicle_id = null, priceboard_id = null } = req.query;

  try {
    if (!vehicle_id && !priceboard_id)
      throwErrorWithStatus(
        "Please provide both priceboard_id and tenant_id",
        400,
      );

    const vehicleId = await validateId(
      vehicle_id,
      "vehicle_id is either missing in the query or not number",
      400,
    );
    const priceBoardId = await validateId(
      priceboard_id,
      "priceboard_id is either missing in the query or not number",
      400,
    );

    // console.log(vehicleId, priceBoardId);

    const vehicleWithPrice = await VehicleService.pairVehicleWithPrice(
      vehicleId,
      priceBoardId,
    );

    if (!vehicleWithPrice) {
      throwErrorWithStatus(
        "Vehicle and priceboard must belong to the same tenant",
        403,
      );
    }

    return res.status(200).json(vehicleWithPrice);
  } catch (err) {
    next(err);
  }
}
