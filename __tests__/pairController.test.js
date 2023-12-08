const request = require("supertest");
const express = require("express");
const pairController = require("../controllers/pairController");
const pairService = require("../services/pairService");
const vehicleService = require("../services/vehicleService");
const priceboardService = require("../services/priceBoardService");

const app = express();
app.use(express.json());

const mockPriceboardId = "1";
const mockVehicleId = "1";

jest.spyOn(console, "error").mockImplementation(() => {});

app.post(
  "/pair/:vehicleId/:priceboardId",
  pairController.pairVehicleWithPriceboard
);
app.get("/pairs", pairController.getAllPairs);

describe("Pair Controller - getAllPairs", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all pairs", async () => {
    const mockPairs = [{ id: 1, vehicleId: "1", priceboardId: "1" }];

    pairService.getAllPairs.mockResolvedValue(mockPairs);

    const response = await request(app).get("/pairs").expect(200);

    expect(response.body).toEqual(mockPairs);
    expect(pairService.getAllPairs).toHaveBeenCalledTimes(1);
  });
});

describe("Pair Controller - pairVehicleWithPriceboard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should pair a vehicle with a priceboard successfully", async () => {
    priceboardService.findOnePriceboard.mockResolvedValue({ tenant_id: "789" });
    vehicleService.findOneVehicle.mockResolvedValue({ tenant_id: "789" });
    pairService.pairVehicleWithPriceboard.mockResolvedValue({ success: true });

    const response = await request(app)
      .post(`/pair/${mockVehicleId}/${mockPriceboardId}`)
      .expect(200);

    expect(response.body).toEqual({ success: true });
    expect(priceboardService.findOnePriceboard).toHaveBeenCalledWith(
      mockPriceboardId
    );
    expect(vehicleService.findOneVehicle).toHaveBeenCalledWith(mockVehicleId);
    expect(pairService.pairVehicleWithPriceboard).toHaveBeenCalledWith(
      mockPriceboardId,
      mockVehicleId
    );
  });

  it("should return a 404 error if priceboard is not found", async () => {
    priceboardService.findOnePriceboard.mockResolvedValue(null);
    vehicleService.findOneVehicle.mockResolvedValue({ tenant_id: "789" });

    await request(app)
      .post(`/pair/${mockVehicleId}/${mockPriceboardId}`)
      .expect(404);

    expect(pairService.pairVehicleWithPriceboard).not.toHaveBeenCalled();
  });

  it("should return a 404 error if vehicle is not found", async () => {
    priceboardService.findOnePriceboard.mockResolvedValue({ tenant_id: "789" });
    vehicleService.findOneVehicle.mockResolvedValue(null);

    await request(app)
      .post(`/pair/${mockVehicleId}/${mockPriceboardId}`)
      .expect(404);

    expect(pairService.pairVehicleWithPriceboard).not.toHaveBeenCalled();
  });

  it("should return a 400 error if priceboard and vehicle have different tenants", async () => {
    priceboardService.findOnePriceboard.mockResolvedValue({ tenant_id: "789" });
    vehicleService.findOneVehicle.mockResolvedValue({ tenant_id: "987" });

    await request(app)
      .post(`/pair/${mockVehicleId}/${mockPriceboardId}`)
      .expect(400);
    expect(pairService.pairVehicleWithPriceboard).not.toHaveBeenCalled();
  });
});
