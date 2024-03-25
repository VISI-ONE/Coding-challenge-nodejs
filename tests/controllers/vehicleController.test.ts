import { Request, Response } from 'express';
import { allVehicles } from '../../src/controllers/vehicleController';
import * as vehicleService from '../../src/services/vehicleService';
import { mockedVehicleData } from '../mockData';

jest.mock('../../src/services/vehicleService');

describe('allVehicles', () => {
    const mockRequest = {} as Request;
    const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all vehicles', async () => {
        (vehicleService.getVehicles as jest.Mock).mockResolvedValueOnce(mockedVehicleData);

        await allVehicles(mockRequest, mockResponse);

        expect(vehicleService.getVehicles).toHaveBeenCalled();
        expect(mockResponse.json).toHaveBeenCalledWith(mockedVehicleData);
    });

    it('should handle errors', async () => {
        const errorMessage = 'Error retrieving vehicles';
        (vehicleService.getVehicles as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        await allVehicles(mockRequest, mockResponse);

        expect(vehicleService.getVehicles).toHaveBeenCalled();
        expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});
