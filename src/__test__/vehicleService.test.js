import { db } from "../repository/index.js";
import { VehicleService } from "../services/index.js";
const {
  getAllVehicles,
  getOneVehicle,
  getVehiclesByTenant,
  pairVehicleWithPrice,
  sqlQuerypairVehicleWithPrice,
} = VehicleService;
import { mockedVehicles } from "./mockData.js";

jest.mock("../repository/index.js");

beforeEach(() => {
  jest.resetAllMocks();
});
describe("Vehicle Functions", () => {
  const mockDbResultWithPrice = [
    { id: 1, product_name: "Product 1", price: 20.99, tenant_id: 1 },
  ];

  it("returns all vehicles", async () => {
    db.getAll.mockResolvedValue(mockedVehicles);
    expect(await getAllVehicles()).toEqual(mockedVehicles);
    expect(db.getAll).toHaveBeenCalledWith("SELECT * FROM vehicles");
  });

  it("returns a vehicle by id", async () => {
    db.getOne.mockResolvedValue(mockedVehicles[0]);
    expect(await getOneVehicle(1)).toEqual(mockedVehicles[0]);
    expect(db.getOne).toHaveBeenCalledWith(
      "SELECT * FROM vehicles WHERE id = ?",
      [mockedVehicles[0].id],
    );
  });

  it("returns vehicles by tenant", async () => {
    const tenantId = 1;
    db.getAll.mockResolvedValue(mockedVehicles);
    expect(await getVehiclesByTenant(tenantId)).toEqual(mockedVehicles);
    expect(db.getAll).toHaveBeenCalledWith(
      "SELECT * FROM vehicles WHERE tenant_id = ?",
      [tenantId],
    );
  });

  it("returns a vehicle with associated price", async () => {
    const tenantId = 1;
    const priceBoardId = 1;
    db.getOne.mockResolvedValue({
      vehicle_name: mockedVehicles[0].vehicle_name,
      price: mockDbResultWithPrice[0].price,
      tenant_id: mockedVehicles[0].tenant_id,
    });
    expect(await pairVehicleWithPrice(tenantId, priceBoardId)).toEqual({
      vehicle_name: mockedVehicles[0].vehicle_name,
      price: mockDbResultWithPrice[0].price,
      tenant_id: mockedVehicles[0].tenant_id,
    });
    expect(db.getOne).toHaveBeenCalledWith(sqlQuerypairVehicleWithPrice, [
      mockedVehicles[0].id,
      mockDbResultWithPrice[0].id,
    ]);
  });
  it("should handle errors from the database", async () => {
    const mockError = new Error("Database error");
    db.getAll.mockRejectedValueOnce(mockError);
    await expect(getAllVehicles()).rejects.toEqual(mockError);
  });
});
