const request = require('supertest');
const app = require('../index');

describe('GET /tenant/:tenantId/priceboards', () => {
  it('responds with json containing a list of all priceboards for a tenant', async () => {
    const tenantId = 1; // Asumming this tenantId is in the DB
    const response = await request(app).get(`/tenant/${tenantId}/priceboards`);

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toBeInstanceOf(Array);
  });
});

// describe('GET /tenant/:tenantId/priceboards', () => {
//     it('should respond with a 404 status code if the tenantId is not found', async () => {
//       const tenantId = 'non_existing_id';
//       const response = await request(app).get(`/tenant/${tenantId}/priceboards`);
  
//       expect(response.statusCode).toBe(404);
//       expect(response.body).toEqual(expect.objectContaining({
//         error: expect.any(String)
//       }));
//     });
// });
