const request = require('supertest');
const express = require('express');
const VehicleController = require('../controllers/VehicleController');

const app = express();

app.get('/tenant/:tenant_id/vehicles', VehicleController.getVehiclesForTanent);
describe('GET /tenent/:tenant_id/vehicles', () => {
    test('expects', async () => {
    const expected_p = [
      {
          "id": 1,
          "vehicle_name": "Honda W",
          "tenant_id": 1
      },
      {
          "id": 2,
          "vehicle_name": "Audi X",
          "tenant_id": 1
      }
    ]
    const response = await request(app).get('/tenant/1/vehicles');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expected_p);
    });
});

app.get('/vehicles', VehicleController.getAllVehicles);
describe('GET /vehicles', () => {
  test('expects', async () => {
  const expected = [
    {
        "id": 1,
        "vehicle_name": "Honda W",
        "tenant_id": 1
    },
    {
        "id": 2,
        "vehicle_name": "Audi X",
        "tenant_id": 1
    },
    {
        "id": 3,
        "vehicle_name": "BMW Y",
        "tenant_id": 2
    },
    {
        "id": 4,
        "vehicle_name": "Toyota Z",
        "tenant_id": 2
    }
  ];
  const response = await request(app).get('/vehicles');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expected);
  });
});