import "@jest/globals";
import httpMocks from "node-mocks-http";

import { getOneTenantPriceboardsController } from "../controllers/index.js";
import { TenantService } from "../services/index.js";
import { throwErrorWithStatus } from "../utils/index.js";

import { mockedPriceBoards, mockedTenants } from "./mockData.js";

jest.mock("../services/index.js");

jest.mock("../utils/index.js");

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("getOneTenantPriceboardsController tests", () => {
  it("should return all the priceboards for a tenant ", async () => {
    req.params.tenantId = 1;
    TenantService.getCountIfTenantExists.mockImplementation(() =>
      Promise.resolve(true),
    );
    const result = mockedPriceBoards.filter(
      (priceboard) => priceboard.tenant_id === req.params.tenantId,
    );
    TenantService.getPriceBoards.mockResolvedValue(result);

    await getOneTenantPriceboardsController(req, res, next);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(result);
  });

  it("should throw an error if tenant does not exist", async () => {
    req.params.tenantId = mockedTenants.length + 1;

    TenantService.getCountIfTenantExists.mockResolvedValue({ count: 0 });

    await getOneTenantPriceboardsController(req, res, next);
    expect(throwErrorWithStatus).toHaveBeenCalledWith(
      "Tenant is not found",
      404,
    );
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should throw an error if no priceboards found for this tenant", async () => {
    req.params.tenantId = 3;

    const result = mockedPriceBoards.filter(
      (priceboard) => priceboard.tenant_id === req.params.tenantId,
    );

    TenantService.getCountIfTenantExists.mockResolvedValue(true);
    TenantService.getPriceBoards.mockResolvedValue(result);

    await getOneTenantPriceboardsController(req, res, next);
    expect(throwErrorWithStatus).toHaveBeenCalledWith(
      "No priceboards found for this tenant",
      404,
    );
  });
});
