
const supertest = require('supertest');
const app = require('../../../src/app');
const { buildTenant, buildPriceBoard } = require('../fixtures');
const { del, insert } = require('../../utils/crud');

const testRequest = supertest(app);

describe('fetchPriceBoards /tenant/:tenantId/priceboards', () => {

    const tenant = buildTenant();
    const priceBoard = buildPriceBoard();

    beforeAll(async () => {
        await del('priceboard', { id: priceBoard.id });
        await del('tenant', { id: tenant.id });

        priceBoard.tenant_id = tenant.id;

        await insert('tenant', tenant);
        await insert('priceboard', priceBoard);
    });


    it('should return 200', async () => {
        const response = await testRequest.get(`/tenant/${tenant.id}/priceboards`);
        const data = response.body;
        expect(response.status).toEqual(200);
        expect(data).toEqual([priceBoard]);
    });
});



