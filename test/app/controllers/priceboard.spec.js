const request = require('supertest');

// Mocking
const mockedPriceboardsService = jest.createMockFromModule('../../../app/services/priceboards');
mockedPriceboardsService.priceboardsByTenantId = () => [];

const app = require('../../../app');

describe('GET /tenant/:id/priceboards', () => {
  it('responds with json', function(done) {
    request(app)
      .get('/tenant/1/priceboards')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('responds with json', function(done) {
    request(app)
      .get('/tenant/a/priceboards')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, done);
  });
});