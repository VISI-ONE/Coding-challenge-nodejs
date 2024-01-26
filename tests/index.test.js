const request = require('supertest');
const app = require('../index');

const apiRequest = request(app);

let server;

beforeAll((done) => {
  const port = process.env.PORT || 3000;
  server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    done();
  });
});

beforeAll(() => {
  // ideally here should be test db re-created
});

afterAll((done) => {
  server.close(() => {
    console.log('Server closed');
    done();
  });
});

describe('API Tests', () => {
  beforeAll(() => {
    // ideally here should bev persisted all entities required for test
  });

  describe('GET /tenant/id/priceboards', () => {
    describe('Wen "tenantId" does not exists', () => {
      it('should return 200 OK', async () => {
        const response = await apiRequest.get('/tenant/0/priceboards');
        expect(response.status).toBe(200);
      });

      it('should return empty result', async () => {
        const response = await apiRequest.get('/tenant/0/priceboards');
        expect(response.body).toStrictEqual([]);
      });
    });
  });

  describe('Wen "tenantId" exists', () => {
    it('GET /tenant/1/priceboards should return 200 OK', async () => {
      const response = await apiRequest.get('/tenant/1/priceboards');
      expect(response.status).toBe(200);
    });

    it('GET /tenant/1/priceboards should return 2 boards', async () => {
      const response = await apiRequest.get('/tenant/1/priceboards');
      expect(response.body).toStrictEqual([
        {
          id: 1,
          price: 10.99,
          product_name: 'Product 1',
          tenant_id: 1,
        },
        {
          id: 2,
          price: 15.99,
          product_name: 'Product 2',
          tenant_id: 1,
        },
      ]);
    });
  });
});
