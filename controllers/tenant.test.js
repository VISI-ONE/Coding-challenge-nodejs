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
  beforeAll(setUpExpressMocks);

  it("Should return priceboards only related to the tenant", () => {
    const mockRequestObj = {
      params: {
        tenantId: 1,
      },
    };

    tenantController.getPriceBoards(mockRequestObj, res);

    expect(resJson).toHaveBeenCalledWith(200)
  });
});
