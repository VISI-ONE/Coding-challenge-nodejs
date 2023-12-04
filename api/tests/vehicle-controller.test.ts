import { Request, Response } from 'express';
import { VehicleService } from '@/services/vehicle.service';
import { VehicleController } from '@/controllers/vehicle.controller';
import { Database } from 'sqlite';
import { Vehicle } from '@/interfaces/Vehicle';
import { PriceboardServiceError } from '@/errors/PriceboardServiceError';

type MockDatabase = Partial<jest.Mocked<Database>>;

describe('VehicleController', () => {
  let vehicleService: VehicleService;
  let vehicleController: VehicleController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  beforeEach(() => {
    const mockDb: MockDatabase = { all: jest.fn() };
    vehicleService = new VehicleService(mockDb as Database);
    vehicleController = new VehicleController(vehicleService);

    mockRequest = { params: {} };
    mockResponse = {
      json: jest.fn(result => {
        return result;
      }),
      status: jest.fn(() => mockResponse),
    };
  });

  test('getVehicles should return 500 on service failure', async () => {
    const errorMessage = new PriceboardServiceError('Problem with Service');
    jest.spyOn(vehicleService, 'getVehicles').mockRejectedValue(errorMessage);

    await vehicleController.getVehicles(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(errorMessage);
  });

  test('getVehicles should return a list of vehicles on success', async () => {
    const mockVehicles: Array<Vehicle> = [
      { id: 'abc123', name: 'Brand New Cabrio', make: 'BMW', model: 'Cabrio', tenant_id: 1 },
      { id: 'def123', name: 'Used R8', make: 'Audi', model: 'R8', tenant_id: 1 },
    ];

    jest.spyOn(vehicleService, 'getVehicles').mockResolvedValue(mockVehicles);

    await vehicleController.getVehicles(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockVehicles);
  });
});
