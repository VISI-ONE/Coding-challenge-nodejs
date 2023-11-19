// test/test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const { expect } = chai;

chai.use(chaiHttp);

describe('GET /vehicles endpoint', () => {
  it('should return a list of vehicles', (done) => {
    chai
      .request(app)
      .get('/v1/vehicles')
      .end((err, res) => {
        expect(res).to.have.status(200);
        chai.expect(res.body).to.be.an('array');

        if (res.body.length > 0) {
          chai.expect(res.body[0]).to.have.property('name');
          chai.expect(res.body[0]).to.have.property('tenant_id');
        }
        done();
      });
  });
});

describe('POST /pair endpoint', () => {
  it('should pair a vehicle and return a success message', (done) => {
    const requestData = {
      vehicle_name: 'Vehicle 1',
      priceboardId: 1
    };

    chai
      .request(app)
      .post('/v1/pair')
      .send(requestData)
      .end((err, res) => {
        chai.expect(res).to.have.status(201);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.message).to.equal('Pairing successful.');
        chai.expect(res.body.pairing).to.be.an('object');
        chai.expect(res.body.pairing.vehicle_name).to.equal(requestData.vehicle_name);
        chai.expect(res.body.pairing.priceboardId).to.equal(requestData.priceboardId);
        done();
      });
  });

  it('should handle invalid request without required fields', (done) => {
    const invalidRequestData = {};

    chai
      .request(app)
      .post('/v1/pair')
      .send(invalidRequestData)
      .end((err, res) => {
        chai.expect(res).to.have.status(400);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.message).to.equal('Invalid pairing. Vehicle and priceboard must belong to the same tenant.');
        done();
      });
  });
});

