const { Router } = require('express')
const vehicleRoutes = Router()

const {
    allVehicles,
    vehiclesPerCompany,
    vehiclePrice,
} = require('../controllers/vehicleControllers')

vehicleRoutes.get('/allVehicles', allVehicles)
vehicleRoutes.get('/vehicles', vehiclesPerCompany)
vehicleRoutes.get('/vehiclePrice', vehiclePrice)

module.exports = { vehicleRoutes }
