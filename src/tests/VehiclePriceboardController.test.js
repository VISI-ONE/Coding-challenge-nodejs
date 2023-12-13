const request = require('supertest');
const express = require('express');
const VehiclePriceboardController = require('../controllers/VehiclePriceboardController');

const app = express();

app.get('/tenant/:tenant_id/pairs', VehiclePriceboardController.getPairsforTenant);
describe('GET /tenent/:tenant_id/pairs', () => {
    test('expects', async () => {
    const expected = [];
    const response = await request(app).get('/tenant/2/pairs');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expected);
    });
});
