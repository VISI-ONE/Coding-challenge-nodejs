
const supertest = require('supertest');
const app = require('../../../src/app');
const { buildTenant, buildVehicle, buildPriceBoard } = require('../fixtures');
const { del, insert } = require('../../utils/crud');

const testRequest = supertest(app);

describe('pair /tenant/:tenantId/vehicle-pair', () => {

    const tenant = buildTenant();
    const tenant2 = buildTenant();
    const vehicle = buildVehicle();
    const priceBoard = buildPriceBoard();
    const priceBoard2 = buildPriceBoard();

    beforeAll(async () => {
        await del('vehicle', { id: vehicle.id });
        await del('tenant', { id: tenant.id });
        await del('tenant', { id: tenant2.id });
        await del('priceboard', { id: priceBoard.id });

        tenant2.id = 2;
        priceBoard2.id = 2;
        priceBoard2.tenant_id = tenant2.id;

        vehicle.tenant_id = tenant.id;
        priceBoard.tenant_id = tenant.id;

        await insert('tenant', tenant);
        await insert('vehicle', vehicle);
        await insert('priceboard', priceBoard);
    });

    it('should return 200', async () => {
        const response = await testRequest.patch(`/tenant/${tenant.id}/vehicle-pair`).send(
            {
                vehicleId: vehicle.id,
                priceBoardId: priceBoard.id
            }
        );
        expect(response.status).toEqual(200);
    });

    it('should return 404 when vehile not found', async () => {
        const notFoundVehicleId = 999999;
        const response = await testRequest.patch(`/tenant/${tenant.id}/vehicle-pair`).send(
            {
                vehicleId: notFoundVehicleId,
                priceBoardId: priceBoard.id
            }
        );
        expect(response.status).toEqual(404);
    });

    it('should return 404 when priceboard not found', async () => {
        const notFoundPriceBoard = 999999;
        const response = await testRequest.patch(`/tenant/${tenant.id}/vehicle-pair`).send(
            {
                vehicleId: vehicle.id,
                priceBoardId: notFoundPriceBoard
            }
        );
        expect(response.status).toEqual(404);
    });

    it('should return 404 trying to pair vehicle with another tenant priceboard', async () => {
        const response = await testRequest.patch(`/tenant/${tenant.id}/vehicle-pair`).send(
            {
                vehicleId: vehicle.id,
                priceBoardId: priceBoard2.id
            }
        );
        expect(response.status).toEqual(404);
    });
});



