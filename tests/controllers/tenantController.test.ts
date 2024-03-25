import { Request, Response } from 'express';
import { getTenantPriceboards } from '../../src/controllers/tenantController';
import * as priceboardService from '../../src/services/priceboardService';
import { mockedPriceboardData } from '../mockData';

jest.mock('../../src/services/priceboardService');

describe('getTenantPriceboards', () => {
    const mockRequest = {
        params: { tenantId: '1' },
    } as unknown as Request;
    const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return priceboards for given tenantId', async () => {
        (priceboardService.getPriceboardsByTenant as jest.Mock).mockResolvedValueOnce(mockedPriceboardData);

        await getTenantPriceboards(mockRequest, mockResponse);

        expect(priceboardService.getPriceboardsByTenant).toHaveBeenCalledWith(1);
        expect(mockResponse.json).toHaveBeenCalledWith(mockedPriceboardData);
    });

    it('should handle errors', async () => {
        const errorMessage = 'Error retrieving priceboards';
        (priceboardService.getPriceboardsByTenant as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        await getTenantPriceboards(mockRequest, mockResponse);

        expect(priceboardService.getPriceboardsByTenant).toHaveBeenCalledWith(1);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});
