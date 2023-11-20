const request = require('supertest');

const server = require('../index')

describe('TENANT ROUTES AND CONTROLLERS', () => {
    describe('GET All tenants', () => {
        it('returns all tenants', async function () {
            const response = await request(server)
                .get('/tenants')
                .expect('Content-Type', /json/)
                .expect(200)

            const expected = [
                {
                    "id": 1,
                    "name": "Tenant A"
                },
                {
                    "id": 2,
                    "name": "Tenant B"
                },
            ]

            expect(response.body).toEqual(expected)
        });
    })

    describe('GET All Price dashboards', function () {
        // afterAll(() => server.close())
        it('returns all price dashboards per tenant', async function () {
            const response = await request(server)
                .get('/tenant/1/priceboards')
                .expect('Content-Type', /json/)
                .expect(200)


            const expected = [
                {
                    "id": 1,
                    "product_name": "Product 1",
                    "price": 10.99,
                    "tenant_id": 1
                },
                {
                    "id": 2,
                    "product_name": "Product 2",
                    "price": 15.99,
                    "tenant_id": 1
                }
            ]

            expect(response.body).toEqual(expected)
        })
    })
});