import db from "../../db";
import { Tables } from "../../db/constants";

export function get({
  make,
  model,
  year,
  color,
  license_plate,
}: {
  make?: string;
  model?: string;
  year?: number;
  color?: string;
  license_plate?: string;
}) {
  const query = db(Tables.Vehicle).select(
    "make",
    "model",
    "year",
    "color",
    "license_plate",
    "mileage"
  );

  if (make) {
    query.where({ make });
  }

  if (model) {
    query.where({ model });
  }

  if (year) {
    query.where({ year });
  }

  if (color) {
    query.where({ color });
  }

  if (license_plate) {
    query.where({ license_plate });
  }

  if (license_plate) {
    query.where({ license_plate });
  }

  return query;
}

export function getById(id: string) {
  return db(Tables.Vehicle).where({ id }).first();
}
