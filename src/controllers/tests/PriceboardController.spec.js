const request = require('supertest');
const express = require('express');
const PriceboardController = require('../PriceboardController');

const app = express();
app.get('/tenant/:tenantId/priceboards', PriceboardController.getAllByTenant);
app.get('/priceboard/:id', PriceboardController.getAll);

describe('GET /tenant/:tenantId/priceboards', () => {
    test('responds with JSON', async () => {
      const response = await request(app).get('/tenant/1/priceboards');
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
});

describe('GET /priceboard/:id', () => {
  test('responds with JSON', async () => {
    const response = await request(app).get('/priceboard/1');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
  });
});