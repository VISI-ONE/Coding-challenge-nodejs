import { db } from "../repository/index.js";
export const sqlQuerypairVehicleWithPrice = `SELECT vehicles.vehicle_name, priceboard.price, vehicles.tenant_id
                    FROM vehicles 
                    INNER JOIN priceboard ON vehicles.tenant_id = priceboard.tenant_id 
                    WHERE vehicles.id = ? AND priceboard.id = ?`;

export const getAllVehicles = () => db.getAll("SELECT * FROM vehicles");

export const getOneVehicle = (vehicleId) =>
  db.getOne("SELECT * FROM vehicles WHERE id = ?", [vehicleId]);

export const getVehiclesByTenant = (tenantId) =>
  db.getAll("SELECT * FROM vehicles WHERE tenant_id = ?", [tenantId]);

export const pairVehicleWithPrice = (vehicleId, priceBoardId) =>
  db.getOne(sqlQuerypairVehicleWithPrice, [vehicleId, priceBoardId]);
