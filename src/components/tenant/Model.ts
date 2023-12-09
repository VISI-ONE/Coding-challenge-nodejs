import db from "../../db";
import { Tables } from "../../db/constants";

export function getById(id: string) {
    return db(Tables.Tenant).where({ id }).first()
}