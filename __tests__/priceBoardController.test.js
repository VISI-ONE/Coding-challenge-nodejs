const request = require("supertest");
const express = require("express");
const priceboardController = require("../controllers/priceBoardController");
const priceboardService = require("../services/priceBoardService");

const app = express();
app.use(express.json());

app.get(
  "/tenants/:tenantId/priceboards",
  priceboardController.getPriceboardsByTenant
);

describe("Priceboard Controller", () => {
  it("should get all priceboards for a specific tenant", async () => {
    const tenantId = "1";
    const mockPriceboards = [{ id: 1, name: "Priceboard 1" }];
    priceboardService.getPriceboardsByTenant.mockResolvedValue(mockPriceboards);

    const response = await request(app)
      .get(`/tenants/${tenantId}/priceboards`)
      .expect(200);

    expect(response.body).toEqual(mockPriceboards);
    expect(priceboardService.getPriceboardsByTenant).toHaveBeenCalledWith(
      tenantId
    );
  });
});
