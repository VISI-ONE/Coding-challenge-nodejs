import { Request, Response } from 'express';
import { getPairByVehicleIdAndPriceboardId } from '../../src/controllers/pairController';
import * as pairingService from '../../src/services/pairingService';

jest.mock('../../src/services/pairingService');

describe('getPairByVehicleIdAndPriceboardId', () => {
    const mockRequest = {
        params: { vehicleId: '1', priceboardId: '1' },
    } as unknown as Request;
    const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return priceboards for given vehicleId and priceboardId', async () => {
        const mockMappedData = [{ "id": 1, "name": "Mercedes", "tenant_id": 1, "product_name": "Product 1", "price": 10.99 }];
        (pairingService.getPairs as jest.Mock).mockResolvedValueOnce(mockMappedData);

        await getPairByVehicleIdAndPriceboardId(mockRequest, mockResponse);

        expect(pairingService.getPairs).toHaveBeenCalledWith(1, 1);
        expect(mockResponse.json).toHaveBeenCalledWith(mockMappedData);
    });

    it('should handle empty result', async () => {
        (pairingService.getPairs as jest.Mock).mockResolvedValueOnce([]);

        await getPairByVehicleIdAndPriceboardId(mockRequest, mockResponse);

        expect(pairingService.getPairs).toHaveBeenCalledWith(1, 1);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'cannot pair this vehicle with this priceboard' });
    });

    it('should handle errors', async () => {
        const errorMessage = 'Error retrieving priceboards';
        (pairingService.getPairs as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
        await getPairByVehicleIdAndPriceboardId(mockRequest, mockResponse);

        expect(pairingService.getPairs).toHaveBeenCalledWith(1, 1);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});
