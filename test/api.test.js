const request = require('supertest');
const app = require('../index');

describe('API Routes', () => {
  it('should return status 200 on GET /vehicles', async () => {
    const res = await request(app).get('/vehicles')
    expect(res.status).toBe(200)
  })

  it('should return status 200 on GET /vehicle/:id/priceboards', async () => {
    const res = await request(app).get('/vehicle/1/priceboards')
    expect(res.status).toBe(200)
  })

  it('should return status 200 on GET /tenant/tenantId/priceboards', async () => {
    const res = await request(app).get('/tenant/1/priceboards')
    expect(res.status).toBe(200)
  })
})