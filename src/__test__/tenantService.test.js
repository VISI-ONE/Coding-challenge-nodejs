import "@jest/globals";

import { db } from "../repository/index.js";
import { TenantService } from "../services/index.js";

jest.mock("../repository/index.js");

const mockedPriceBoards = [
  { id: 1, price: 10.99, tenant_id: 1 },
  { id: 2, price: 15.99, tenant_id: 1 },
  { id: 3, price: 8.49, tenant_id: 2 },
];

const mockedTenants = [
  { name: "Tenant A", id: 1 },
  { name: "Tenant B", id: 2 },
  { name: "Tenant C", id: 3 },
];

describe("Tenant Service", () => {
  it("should return priceboards of a tenant by id", async () => {
    const tenantId = 1;
    const result = mockedPriceBoards.filter(
      (priceBoard) => priceBoard.tenant_id === tenantId,
    );
    db.getAll.mockResolvedValue(result);
    expect(await TenantService.getPriceBoards(tenantId)).toEqual(result);
    expect(db.getAll).toHaveBeenCalledWith(
      "SELECT * FROM priceboard WHERE tenant_id = ?",
      tenantId,
    );
    expect(db.getAll).toHaveBeenCalledTimes(1);
  });
  it("should verify if a tenant by id is unique and returns the count/frequency of the tenant in db", async () => {
    const tenantId = mockedTenants[0].id;
    const result = { count: 1 };
    db.getOne.mockResolvedValue(result);
    expect(await TenantService.getCountIfTenantExists(tenantId)).toEqual(
      result,
    );
    expect(db.getOne).toHaveBeenCalledWith(
      "SELECT count(*) AS [count] FROM tenant WHERE id = ?",
      tenantId,
    );
    expect(db.getOne).toHaveBeenCalledTimes(1);
  });
});
