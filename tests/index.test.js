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

afterAll((done) => {
  server.close(() => {
    console.log('Server closed');
    done();
  });
});

describe('API Tests', () => {
  it('GET /tenant/1/priceboards should return 200 OK', async () => {
    const response = await apiRequest.get('/tenant/1/priceboards');
    expect(response.status).toBe(200);
  });
});
