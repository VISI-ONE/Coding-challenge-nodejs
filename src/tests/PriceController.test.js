const request = require('supertest');
const express = require('express');
const PriceboardController = require('../controllers/PriceboardController');

const app = express();

app.get('/tenant/:tenant_id/priceboards', PriceboardController.getPriceboardsForTenant);
describe('GET /tenant/:tenant_id/priceboards', () => {
    test('expects', async () => {
    const expected_p = [
        {id: 1, product_name: 'Product 1', price: 10.99, tenant_id: 1},
        {id: 2, product_name: 'Product 2', price: 15.99, tenant_id: 1}
      ];
    const response = await request(app).get('/tenant/1/priceboards');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expected_p);
    });
});

app.get('/priceboards', PriceboardController.getAllPriceboards);
describe('GET /priceboards', () => {
  test('expects', async () => {
  const expected = [
      {"id":1,"product_name":"Product 1","price":10.99,"tenant_id":1},
      {"id":2,"product_name":"Product 2","price":15.99,"tenant_id":1},
      {"id":3,"product_name":"Product 3","price":8.49,"tenant_id":2},
      {"id":4,"product_name":"Product 4","price":12.99,"tenant_id":2}
    ];
  const response = await request(app).get('/priceboards');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expected);
  });
});