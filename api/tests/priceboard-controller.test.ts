import { Request, Response } from 'express';
import { PriceboardService, VehicleService } from '@/services/';
import { PriceboardController } from '@/controllers/priceboard.controller';
import { Database } from 'sqlite';
import { Priceboard } from '@/types/Priceboard';

type MockDatabase = Partial<jest.Mocked<Database>>;

describe('PriceboardController', () => {
  let priceboardService: PriceboardService;
  let priceboardController: PriceboardController;
  let vehicleService: VehicleService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  beforeEach(() => {
    const mockDb: MockDatabase = { all: jest.fn() };
    priceboardService = new PriceboardService(mockDb as Database, vehicleService);
    priceboardController = new PriceboardController(priceboardService);

    mockRequest = { params: {} };
    mockResponse = {
      json: jest.fn(result => {
        return result;
      }),
      status: jest.fn(() => mockResponse),
    };
  });

  test('getPriceboardsWithTenantId should return 500 on service failure', async () => {
    const tenantId = '999';
    // Updated error message to match the controller's output
    const errorMessage = { message: 'Error retrieving priceboard with tenant id.' };

    mockRequest.params = { tenantId };
    jest
      .spyOn(priceboardService, 'getPriceboardsWithTenantId')
      .mockRejectedValue(new Error('Problem with Service'));

    await priceboardController.getPriceboardsWithTenantId(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(errorMessage);
  });

  test('getPriceboardsWithTenantId should return a list of priceboards on success', async () => {
    const tenantId = '1';
    const mockPriceboards: Array<Priceboard> = [
      { id: 1, product_name: 'Product 1', price: 10.99, tenant_id: 1 },
      { id: 2, product_name: 'Product 2', price: 15.99, tenant_id: 1 },
    ];

    mockRequest.params = { tenantId };
    jest.spyOn(priceboardService, 'getPriceboardsWithTenantId').mockResolvedValue(mockPriceboards);

    await priceboardController.getPriceboardsWithTenantId(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockPriceboards);
  });
});
