const request = require('supertest');
const express = require("express");
const app = express();
const router = require('./tenant.service')
app.use('/api/v1', router);


describe('Tenant service', () => {
  it('should return all priceboards for a specific tenant', async () => {
    const tenantId = '1';
    const expectedResponse = [
      { id: 1,  product_name: 'Product 1', price: 10.99, tenant_id: 1 },
      { id: 2,  product_name: 'Product 2', price: 15.99, tenant_id: 1 },
    ];

    const response = await request(app).get(`/api/v1/tenant/${tenantId}/priceboards`);

    console.log('teststtet', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);

  });

  it('should return not found if the id is wrong', async () => {
    const tenantId = 'bad_tenant_id';

    const response = await request(app).get(`/tenant/${tenantId}/priceboards`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

});