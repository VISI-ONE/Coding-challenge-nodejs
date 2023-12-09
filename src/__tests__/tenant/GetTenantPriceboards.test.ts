import request from "supertest";
import app from "../../app";
import { Tenant } from "../../errors";

describe("GET /tenant/:id/priceboards", () => {
  test("Bad request error when tenantId is invalid", async () => {
    const tenantId = "invalid";
    const res = await request(app).get(`/tenants/${tenantId}/priceboards`);

    expect(res.status).toEqual(400);
  });

  test("Not found when tenant not present in DB", async () => {
    const tenantId = "5";
    const res = await request(app).get(`/tenants/${tenantId}/priceboards`);

    expect(res.status).toEqual(404);
    expect(res.body).toEqual({ message: Tenant.notFound });
  });

  test("Successfully return priceboards for a tenant", async () => {
    const tenantId = "1";
    const res = await request(app).get(`/tenants/${tenantId}/priceboards`);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      { id: 1, price: 10.99, product_name: "Product 1", tenant_id: 1 },
      { id: 2, price: 15.99, product_name: "Product 2", tenant_id: 1 },
    ]);
  });
});
