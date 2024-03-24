import { db } from "../repository/index.js";
import { VehicleService } from "../services/index.js";
const {
  getAllVehicles,
  getOneVehicle,
  getVehiclesByTenant,
  pairVehicleWithPrice,
  sqlQuerypairVehicleWithPrice,
} = VehicleService;

jest.mock("../repository/index.js");

beforeEach(() => {
  jest.resetAllMocks();
});
describe("Vehicle Functions", () => {
  const mockDbResult = [
    { id: 1, vehicle_name: "bmw", tenant_id: 1 },
    { id: 2, vehicle_name: "audi", tenant_id: 1 },
  ];

  const mockDbResultWithPrice = [
    { id: 1, product_name: "Product 1", price: 20.99, tenant_id: 1 },
  ];

  it("returns all vehicles", async () => {
    db.getAll.mockResolvedValue(mockDbResult);
    expect(await getAllVehicles()).toEqual(mockDbResult);
    expect(db.getAll).toHaveBeenCalledWith("SELECT * FROM vehicles");
  });

  it("returns a vehicle by id", async () => {
    db.getOne.mockResolvedValue(mockDbResult[0]);
    expect(await getOneVehicle(1)).toEqual(mockDbResult[0]);
    expect(db.getOne).toHaveBeenCalledWith(
      "SELECT * FROM vehicles WHERE id = ?",
      [mockDbResult[0].id],
    );
  });

  it("returns vehicles by tenant", async () => {
    const tenantId = 1;
    db.getAll.mockResolvedValue(mockDbResult);
    expect(await getVehiclesByTenant(tenantId)).toEqual(mockDbResult);
    expect(db.getAll).toHaveBeenCalledWith(
      "SELECT * FROM vehicles WHERE tenant_id = ?",
      [tenantId],
    );
  });

  it("returns a vehicle with associated price", async () => {
    const tenantId = 1;
    const priceBoardId = 1;
    db.getOne.mockResolvedValue({
      vehicle_name: mockDbResult[0].vehicle_name,
      price: mockDbResultWithPrice[0].price,
      tenant_id: mockDbResult[0].tenant_id,
    });
    expect(await pairVehicleWithPrice(tenantId, priceBoardId)).toEqual({
      vehicle_name: mockDbResult[0].vehicle_name,
      price: mockDbResultWithPrice[0].price,
      tenant_id: mockDbResult[0].tenant_id,
    });
    expect(db.getOne).toHaveBeenCalledWith(sqlQuerypairVehicleWithPrice, [
      mockDbResult[0].id,
      mockDbResultWithPrice[0].id,
    ]);
  });
  it("should handle errors from the database", async () => {
    const mockError = new Error("Database error");
    db.getAll.mockRejectedValueOnce(mockError);
    await expect(getAllVehicles()).rejects.toEqual(mockError);
  });
});
