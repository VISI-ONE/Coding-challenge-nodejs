require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./shared/db')

const { tenantRouter } = require('./routes/tenantRoutes')
const { vehicleRoutes } = require('./routes/vehicleRoutes')

const app = express()

app.use(bodyParser.json())

app.use('/', [tenantRouter, vehicleRoutes])

const port = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Server Running on ${port}`))
}
module.exports = app
