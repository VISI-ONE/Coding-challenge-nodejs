import { db } from "../repository/index.js";
export const getPriceBoards = (id) =>
  db.getAll("SELECT * FROM priceboard WHERE tenant_id = ?", id);

export const getCountIfTenantExists = (id) =>
  db.getOne("SELECT count(*) AS [count] FROM tenant WHERE id = ?", id);
