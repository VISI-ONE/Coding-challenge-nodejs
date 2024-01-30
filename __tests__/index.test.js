const request = require('supertest');
const app = require('../index');

jest.mock('knex', () => {
  return jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockImplementation(() => Promise.resolve([
      { id: 1, product_name: 'Product A', price: 10.00, tenant_id: 1 },
      { id: 2, product_name: 'Product B', price: 15.00, tenant_id: 1 }
    ]))
  }));
});

describe('GET /tenant/:tenantId/priceboards', () => {
  it('should return priceboards for a valid tenantId', async () => {
    const response = await request(app).get('/tenant/1/priceboards');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      { id: 1, product_name: 'Product A', price: 10.00, tenant_id: 1 },
      { id: 2, product_name: 'Product B', price: 15.00, tenant_id: 1 }
    ]);
  });

});