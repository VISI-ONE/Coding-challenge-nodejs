const request = require('supertest');
const express = require('express');
const VehicleController = require('../VehicleController');

const app = express();
app.get('/tenant/:tenantId/vehicles', VehicleController.getAllByTenant);
app.get('/vehicle/:id', VehicleController.getAll);

describe('GET /tenant/:tenantId/vehicles', () => {
    test('responds with JSON', async () => {
      const response = await request(app).get('/tenant/1/vehicles');
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
});

describe('GET /vehicle/:id', () => {
  test('responds with JSON', async () => {
    const response = await request(app).get('/vehicle/4');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
  });
});