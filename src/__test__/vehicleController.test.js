import "@jest/globals";

import httpMocks from "node-mocks-http";

import {
  getVehiclesController,
  pairVehicleWithPriceboardController,
} from "../controllers/index.js";

import { throwErrorWithStatus } from "../utils/index.js";
import { VehicleService } from "../services/index.js";
import { TenantService } from "../services/index.js";

import {
  mockedPriceBoards,
  mockedTenants,
  mockedVehicles,
} from "./mockData.js";

jest.mock("../services/index.js");
jest.mock("../utils/index.js");

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Get Vehicles Controller", () => {
  it("should return a vehicle with vehicle_id", async () => {
    req.query.vehicle_id = "1";
    req.query.tenant_id = null;
    const result = mockedVehicles.find((v) => v.id === 1);
    VehicleService.getOneVehicle.mockResolvedValue(result);
    await getVehiclesController(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toEqual(result);
  });

  it("should return vehicles by tenant_id", async () => {
    req.query.tenant_id = "1";
    req.query.vehicle_id = null;
    const result = mockedVehicles.filter((v) => v.tenant_id === 1);
    VehicleService.getVehiclesByTenant.mockResolvedValue(result);
    TenantService.getCountIfTenantExists.mockResolvedValue({ count: 1 });
    await getVehiclesController(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toEqual(result);
  });

  it("should return all vehicles if no query parameters are provided", async () => {
    req.query.tenant_id = null;
    req.query.vehicle_id = null;
    const result = mockedVehicles;
    VehicleService.getAllVehicles.mockResolvedValue(result);
    await getVehiclesController(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toEqual(result);
  });

  it("should return error when vehicle_id && tenant_id are both provided", async () => {
    req.query.vehicle_id = "1";
    req.query.tenant_id = "1";

    await getVehiclesController(req, res, next);

    expect(throwErrorWithStatus).toHaveBeenCalledWith(
      "Please provide either vehicle_id or tenant_id, not both",
      400,
    );
    expect(throwErrorWithStatus).toHaveBeenCalledTimes(1);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should catch and call next for any errors", async () => {
    const error = new Error("Async error message");
    VehicleService.getAllVehicles.mockRejectedValueOnce(error);
    await getVehiclesController(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });

  it("should return error for invalid/non-numeric vehicle_id", async () => {
    req.query.vehicle_id = "invalid-2";
    await getVehiclesController(req, res, next);
    expect(throwErrorWithStatus).toHaveBeenCalledWith(
      "vehicle_id must be a number",
      400,
    );
    expect(res._isEndCalled).toBeTruthy();
  });

  it("should return error for invalid/non-parsable tenant_id", async () => {
    req.query.tenant_id = "a-2p";
    await getVehiclesController(req, res, next);
    expect(throwErrorWithStatus).toHaveBeenCalledWith(
      "tenant_id must be a number",
      400,
    );
    expect(res._isEndCalled).toBeTruthy();
  });

  it("should return error for non-existent vehicle", async () => {
    req.query.vehicle_id = mockedVehicles.length + 1;

    VehicleService.getOneVehicle.mockResolvedValue(undefined);
    await getVehiclesController(req, res, next);

    expect(throwErrorWithStatus).toHaveBeenCalledWith(
      "Vehicle does not exist",
      404,
    );
    expect(throwErrorWithStatus).toHaveBeenCalledTimes(1);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return error for non-existent tenant", async () => {
    req.query.tenant_id = mockedTenants.length + 1;

    TenantService.getCountIfTenantExists.mockResolvedValue({ count: 0 });
    VehicleService.getOneVehicle.mockResolvedValue(null);
    await getVehiclesController(req, res, next);

    expect(throwErrorWithStatus).toHaveBeenCalledWith(
      "Tenant is not found",
      404,
    );
    expect(throwErrorWithStatus).toHaveBeenCalledTimes(1);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

/////

describe("pair Vehicle With Priceboard Controller", () => {
  it("should pair vehicle with priceboard when vehicle_id && tenant_id are both provided", async () => {
    req.query.vehicle_id = 1;
    req.query.priceboard_id = 2;
    const result = {};
    result.price = mockedPriceBoards.find(
      (p) => p.id === req.query.priceboard_id,
    ).price;
    result.vehicle_name = mockedVehicles.find(
      (v) => v.id === req.query.vehicle_id,
    ).vehicle_name;
    result.tenant_id = mockedVehicles.find(
      (v) => v.id === req.query.vehicle_id,
    ).tenant_id;
    VehicleService.pairVehicleWithPrice.mockResolvedValue(result);
    await pairVehicleWithPriceboardController(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(result);
  });

  it("should return error vehicle_id && tenant_id are both not provided", async () => {
    req.query.vehicle_id = null;
    req.query.tenant_id = null;
    await pairVehicleWithPriceboardController(req, res, next);
    expect(throwErrorWithStatus).toHaveBeenCalledWith(
      "Please provide both priceboard_id and tenant_id",
      400,
    );
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return error for invalid vehicle_id", async () => {
    req.query.vehicle_id = "invalid-2";
    await pairVehicleWithPriceboardController(req, res, next);
    expect(throwErrorWithStatus).toHaveBeenCalledWith(
      "vehicle_id is either missing in the query or not number",
      400,
    );
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return error for invalid priceboard_id", async () => {
    req.query.priceboard_id = "invalid-2";
    await pairVehicleWithPriceboardController(req, res, next);
    expect(throwErrorWithStatus).toHaveBeenCalledWith(
      "priceboard_id is either missing in the query or not number",
      400,
    );
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return error if pairVehicleWithPriceboard service function throws an error", async () => {
    const error = new Error("An error occurred");
    VehicleService.pairVehicleWithPrice.mockRejectedValueOnce(error);
    await pairVehicleWithPriceboardController(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});
