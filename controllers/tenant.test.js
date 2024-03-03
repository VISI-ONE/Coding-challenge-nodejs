const tenantController = require("./tenant");

//https://blog.bguiz.com/2017/mocking-chained-apis-jest/
let res;
let resSet;
let resStatus;
let resJson;

function setUpExpressMocks() {
  resJson = jest.fn();
  resStatus = jest.fn();
  resSet = jest.fn();
  res = {
    set: resSet,
    status: resStatus,
    json: resJson,
  };
  resJson.mockImplementation(() => res);
  resStatus.mockImplementation(() => res);
  resSet.mockImplementation(() => res);
}

describe("Tenant Controllers", () => {
  beforeEach(setUpExpressMocks);

  it("Should return priceboards only related to the tenant", () => {
    const mockRequestObj = {
      params: {
        tenantId: 1,
      },
    };

    resJson.mockImplementation((rows) => {
      expect(rows).toHaveLength(1);

      // Try to find data from another tenant
      const secondTenantData = rows.find((row) => row.tenant_id !== 1);
      expect(secondTenantData).toBeDefined();

      done();
      return res;
    });

    tenantController.getPriceBoards(mockRequestObj, res);
  });

  it("Should return vehicles only related to the tenant", () => {
    const mockRequestObj = {
      params: {
        tenantId: 1,
      },
    };

    resJson.mockImplementation((rows) => {
      expect(rows).toHaveLength(2);

      const secondTenantData = rows.find((row) => row.tenant_id !== 1);
      expect(secondTenantData).not.toBeDefined();

      return res;
    });

    tenantController.getVehicles(mockRequestObj, res);
  });

  it("Should pair a vehicle to a priceboard", () => {
    const mockRequestObj = {
      params: {
        tenantId: 1,
      },
      body: {
        vehicleId: 1,
        priceboardId: 1,
      },
    };

    resJson.mockImplementation((response) => {
      expect(response).toBe({ ok: true });

      return res;
    });

    tenantController.pairVehicleToPriceboard(mockRequestObj, res);

    resJson.mockImplementation((rows) => {
      expect(rows[0].tenant_id).toBe(1);

      return res;
    });

    // If the first test past we can trust this function
    tenantController.getPriceBoards(mockRequestObj, res);
  });
});
