
const supertest = require('supertest');
const app = require('../../../src/app');
const { buildTenant, buildVehicle } = require('../fixtures');
const { del, insert } = require('../../utils/crud');

const testRequest = supertest(app);

describe('fetchVehicles /tenant/:tenantId/vehicles', () => {

    const tenant = buildTenant();
    const vehicle = buildVehicle();

    beforeAll(async () => {
        await del('vehicle', { id: vehicle.id });
        await del('tenant', { id: tenant.id });


        vehicle.tenant_id = tenant.id;

        await insert('tenant', tenant);
        await insert('vehicle', vehicle);
    });


    it('should return 200', async () => {
        const response = await testRequest.get(`/tenant/${tenant.id}/vehicles`);
        const data = response.body;
        expect(response.status).toEqual(200);
        expect(data).toEqual([vehicle]);
    });
});



