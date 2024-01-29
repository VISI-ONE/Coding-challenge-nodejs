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
    // ideally here should be persisted all entities required for test
  });

  describe('GET /priceboards/:id', () => {
    describe('When "id" does not exists', () => {
      it('should return 404 Not Found', async () => {
        const response = await apiRequest.get('/priceboards/0');
        expect(response.status).toBe(404);
      });
    });

    describe('When "id" exists', () => {
      it('should return 200 Ok', async () => {
        const response = await apiRequest.get('/priceboards/1');
        expect(response.status).toBe(200);
      });

      it('should return 200 Ok', async () => {
        const response = await apiRequest.get('/priceboards/1');
        expect(response.body).toStrictEqual({
          id: 1,
          price: 10.99,
          product_name: 'Product 1',
          tenant_id: 1,
          vehicle_id: null,
        });
      });
    });
  });

  describe('GET /tenant/id/priceboards', () => {
    describe('When "tenantId" does not exists', () => {
      it('should return 200 OK', async () => {
        const response = await apiRequest.get('/tenant/0/priceboards');
        expect(response.status).toBe(200);
      });

      it('should return empty result', async () => {
        const response = await apiRequest.get('/tenant/0/priceboards');
        expect(response.body).toStrictEqual([]);
      });
    });

    describe('When "tenantId" exists', () => {
      it('GET /tenant/1/priceboards should return 200 OK', async () => {
        const response = await apiRequest.get('/tenant/1/priceboards');
        expect(response.status).toBe(200);
      });

      it('GET /tenant/1/priceboards should return all connected boards', async () => {
        const response = await apiRequest.get('/tenant/1/priceboards');
        expect(response.body).toStrictEqual([
          {
            id: 1,
            price: 10.99,
            product_name: 'Product 1',
            tenant_id: 1,
            vehicle_id: null,
          },
          {
            id: 2,
            price: 15.99,
            product_name: 'Product 2',
            tenant_id: 1,
            vehicle_id: null,
          },
        ]);
      });
    });
  });

  describe('GET /tenant/id/vehicles', () => {
    describe('When "tenantId" does not exists', () => {
      it('should return 200 OK', async () => {
        const response = await apiRequest.get('/tenant/0/vehicles');
        expect(response.status).toBe(200);
      });

      it('should return empty result', async () => {
        const response = await apiRequest.get('/tenant/0/vehicles');
        expect(response.body).toStrictEqual([]);
      });
    });

    describe('When "tenantId" exists should return all connected vehicles', () => {
      it('should return 200 OK', async () => {
        const response = await apiRequest.get('/tenant/1/vehicles');
        expect(response.status).toBe(200);
      });

      it('should return empty result', async () => {
        const response = await apiRequest.get('/tenant/1/vehicles');
        expect(response.body).toStrictEqual([
          {
            id: 1,
            name: 'VW',
            tenant_id: 1,
          },
          {
            id: 2,
            name: 'Opel',
            tenant_id: 1,
          },
        ]);
      });
    });
  });

  describe('POST /tenant/:tenantId/vehicle-priceboard', () => {
    describe('When "tenantId" does not exists', () => {
      it('should return 404 NotFound', async () => {
        const response = await apiRequest
          .post('/tenant/0/vehicle-priceboard')
          .send({ priceboardId: 0, vehicleId: 0 });
        expect(response.status).toBe(404);
      });
    });

    describe('When payload is invalid', () => {
      it('should return 400 Bad Request', async () => {
        const response = await apiRequest
          .post('/tenant/1/vehicle-priceboard')
          .send({});
        expect(response.status).toBe(400);
      });
    });

    describe('When the board does not belong to the tenant', () => {
      it('should return 412 Precondition Failed', async () => {
        const response = await apiRequest
          .post('/tenant/1/vehicle-priceboard')
          .send({ priceboardId: 5, vehicleId: 1 });
        expect(response.status).toBe(412);
      });
    });

    describe('When the vehicle does not belong to the tenant', () => {
      it('should return 412 Precondition Failed', async () => {
        const response = await apiRequest
          .post('/tenant/1/vehicle-priceboard')
          .send({ priceboardId: 1, vehicleId: 5 });
        expect(response.status).toBe(412);
      });
    });

    describe('When the vehicle and the price board belong to the tenant', () => {
      it('should pair vehicle and price board', async () => {
        const response = await apiRequest
          .post('/tenant/1/vehicle-priceboard')
          .send({ priceboardId: 1, vehicleId: 1 });
        expect(response.status).toBe(204);
      });

      describe('When fetching the priceboard again', () => {
        it('should return updated price board', async () => {
          const response = await apiRequest.get('/priceboards/1');
          expect(response.body).toStrictEqual({
            id: 1,
            price: 10.99,
            product_name: 'Product 1',
            tenant_id: 1,
            vehicle_id: 1,
          });
        });
      });
    });
  });
});
