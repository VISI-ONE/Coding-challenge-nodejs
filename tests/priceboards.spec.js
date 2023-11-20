// test/test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const { expect } = chai;

chai.use(chaiHttp);

describe('GET /priceboards endpoint', () => {
  it('should return a list of priceboards', (done) => {
    chai
      .request(app)
      .get('/v1/priceboards')
      .end((err, res) => {
        expect(res).to.have.status(200);
        chai.expect(res.body).to.be.an('array');

        if (res.body.length > 0) {
          chai.expect(res.body[0]).to.have.property('id');
          chai.expect(res.body[0]).to.have.property('product_name');
          chai.expect(res.body[0]).to.have.property('price');
          chai.expect(res.body[0]).to.have.property('tenant_id');
        }
        done();
      });
  });
});
