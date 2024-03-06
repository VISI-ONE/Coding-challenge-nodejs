const request = require('supertest');
const app = require('../app');

describe('API endpoints', () => {
  describe('GET /tenant/:tenantId/priceboards', () => {
    it('responds with status 200 and returns an array of priceboards', async () => {
      const response = await request(app).get('/tenant/1/priceboards');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('responds with status 400 if invalid tenantId', async () => {
      const response = await request(app).get('/tenant/invalid_id/priceboards');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Invalid tenant ID');
    });
  });

  describe('POST /pairing/pair', () => {
    it('responds with status 200 and pairs vehicle with priceboard', async () => {
      const vehicleId = 1;
      const priceboardId = 1;

      const response = await request(app)
        .post('/pairing/pair')
        .send({ vehicleId, priceboardId });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Vehicle successfully paired with priceboard');
    });

    it('responds with status 403 if vehicle and priceboard belong to different tenants', async () => {
      const vehicleId = 1;
      const priceboardId = 2;

      const response = await request(app)
        .post('/pairing/pair')
        .send({ vehicleId, priceboardId });

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('error', 'Vehicle and priceboard belong to different tenants');
    });
  });

  describe('GET /vehicles', () => {
    it('responds with status 200 and returns an array of vehicles', async () => {
      const response = await request(app).get('/vehicles');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
