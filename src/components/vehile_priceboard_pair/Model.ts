import db from "../../db";
import { Tables } from "../../db/constants";

export function create({
  vehicle_id,
  priceboard_id,
}: {
  vehicle_id?: string;
  priceboard_id?: string;
}) {
  return db(Tables.VehiclePriceboardPair)
    .insert({
      vehicle_id,
      priceboard_id,
    })
    .returning("*");
}

export function getByVehicleIdAndTenantId({
  vehicle_id,
  priceboard_id,
}: {
  vehicle_id?: string;
  priceboard_id?: string;
}) {
  return db(Tables.VehiclePriceboardPair)
    .where({
      vehicle_id,
      priceboard_id,
    })
    .first();
}
