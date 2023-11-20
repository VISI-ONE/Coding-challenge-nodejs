const { Router} = require('express')

const { allPriceDashboards, allTenants } = require('../controllers/tenantControllers')

const tenantRouter = Router()

tenantRouter.get('/tenants', allTenants)
tenantRouter.get('/tenant/:tenantId/priceboards', allPriceDashboards)

module.exports = { tenantRouter }