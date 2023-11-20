const request = require('supertest')

const server = require('../index')

describe('VEHICLE ROUTES AND CONTROLLERS', function () {
    describe('GET All Vehicles', () => {
        // afterAll(() => server.close())

        it('returns array of objects with all properties', async function () {
            const response = await request(server)
                .get('/allVehicles')
                .expect('Content-Type', /json/)
                .expect(200)

            const expectedResponse = ['id', 'vehicle_name', 'tenant_id']

            expect(Object.keys(response.body[0])).toEqual(expectedResponse)
            expect(response.body[0]).toHaveProperty(
                'id',
                'price',
                'product_name'
            )
        })
    })
    describe('GET Get Vehicles per company', () => {
        it('returns vehicles per company ', async function () {
            const queryArgs = 'tenantId=1'

            const response = await request(server)
                .get(`/vehicles?${queryArgs}`)
                .expect('Content-Type', /json/)
                .expect(200)

            const expected = [
                { id: 1, vehicle_name: 'ford', tenant_id: 1 },
                { id: 2, vehicle_name: 'ferrari', tenant_id: 1 },
                { id: 4, vehicle_name: 'volvo', tenant_id: 1 },
            ]

            expect(response.body).toEqual(expected)
        })

        it('returns empty array if tenant is found but there are no vehicles', async () => {
            const queryArgs = 'tenantId=3'

            const response = await request(server)
                .get(`/vehicles?${queryArgs}`)
                .expect('Content-Type', /json/)
                .expect(200)

            const expected = []

            expect(response.body).toEqual(expected)
        })

        it('returns 404 if no tenant is found', async () => {
            const queryArgs = 'tenantId=4'

            const response = await request(server)
                .get(`/vehicles?${queryArgs}`)
                .expect('Content-Type', /json/)
                .expect(404)
        })
    })
    describe('GET Unique Vehicle Price', () => {
        it('returns a vehicle name and price when found', async () => {
            const queryArgs = 'idVehicle=1&tenantId=1&idPriceBoard=1'

            const response = await request(server)
                .get(`/vehiclePrice?${queryArgs}`)
                .expect('Content-Type', /json/)
                .expect(200)

            const expectedResponse = {
                name: 'ford',
                price: 10.99,
            }

            expect(response.body).toEqual(expectedResponse)
        })

        it('returns 404 if tenant is not found', async () => {
            const queryArgs = 'idVehicle=1&tenantId=5&idPriceBoard=1'

            const response = await request(server)
                .get(`/vehiclePrice?${queryArgs}`)
                .expect('Content-Type', /json/)
                .expect(404)
        })

        it('returns partial response when vehicle is not found', async () => {
            const queryArgs = 'idVehicle=3&tenantId=1&idPriceBoard=1'

            const response = await request(server)
                .get(`/vehiclePrice?${queryArgs}`)
                .expect('Content-Type', /json/)
                .expect(200)

            expect(response.body).toEqual({ name: null, price: 10.99 })
        })

        it('returns partial response when priceboard is not found', async () => {
            const queryArgs = 'idVehicle=3&tenantId=2&idPriceBoard=1'

            const response = await request(server)
                .get(`/vehiclePrice?${queryArgs}`)
                .expect('Content-Type', /json/)
                .expect(200)

            expect(response.body).toEqual({ name: 'tesla', price: null })
        })
    })
})
