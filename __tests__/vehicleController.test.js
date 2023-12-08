const request = require('supertest');
const express = require('express');
const vehicleController = require('../controllers/vehicleController');
const vehicleService = require('../services/vehicleService');

const app = express();
app.use(express.json());

app.get('/vehicles', vehicleController.getAllVehicles);
app.get('/tenants/:tenantId/vehicles', vehicleController.getVehiclesByTenantId);

describe('Vehicle Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all vehicles', async () => {
    const mockVehicles = [{ id: 1, name: 'Vehicle 1' }];
    vehicleService.getAllVehicles.mockResolvedValue(mockVehicles);

    const response = await request(app)
      .get('/vehicles')
      .expect(200);

    expect(response.body).toEqual(mockVehicles);
    expect(vehicleService.getAllVehicles).toHaveBeenCalledTimes(1);
  });

  it('should get vehicles by tenant', async () => {
    const mockVehicles = [{ id: 1, name: 'Vehicle 1' }];
    const tenantId = '1';
    vehicleService.getVehiclesByTenant.mockResolvedValue(mockVehicles);

    const response = await request(app)
      .get(`/tenants/${tenantId}/vehicles`)
      .expect(200);

    expect(response.body).toEqual(mockVehicles);
    expect(vehicleService.getVehiclesByTenant).toHaveBeenCalledWith(tenantId);
  });
});