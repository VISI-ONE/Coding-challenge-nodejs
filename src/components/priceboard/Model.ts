import db from "../../db";
import { Tables } from "../../db/constants";

export function get({ tenantId }: { tenantId: string }) {
  return db(Tables.Priceboards).where({ tenant_id: tenantId });
}

export function getById(id: string) {
  return db(Tables.Priceboards).where({ id }).first();
}
