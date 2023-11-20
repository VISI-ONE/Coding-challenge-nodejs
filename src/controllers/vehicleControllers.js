const db = require('../shared/db')

function getTenant(tenantId) {
    return new Promise((res, rej) => {
        const tenantQuery = 'SELECT * FROM tenant WHERE id = ?'
        db.all(tenantQuery, [tenantId], (err, rows) => {
            if (err) {
                console.log('Error querying tenant', err)
                return res.status(500).send({ error: 'Internal Server Error' })
            } else {
                return res(rows)
            }
        })
    })
}

exports.allVehicles = function (req, res) {
    const query = 'SELECT * FROM vehicles'
    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving vehicles' })
        } else {
            res.status(200).json(rows)
        }
    })
}

exports.vehiclesPerCompany = async function (req, res) {
    const tenantId = parseInt(req.query.tenantId)

    if (isNaN(tenantId)) {
        throw 'Not a number'
    }

    const tenant = await getTenant(tenantId)

    if (!tenant.length) {
        console.log('no tenant with that id', tenantId)
        return res.status(404).send({ message: 'Not found' })
    }
    const query = 'SELECT * FROM vehicles WHERE tenant_id = ?'

    db.all(query, [tenantId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving vehicles' })
        } else {
            res.status(200).json(rows)
        }
    })
}

exports.vehiclePrice = async function (req, res) {
    const tenantId = parseInt(req.query.tenantId)
    const idVehicle = parseInt(req.query.idVehicle)
    const idPriceBoard = parseInt(req.query.idPriceBoard)

    const vehicleQuery =
        'SELECT vehicle_name FROM vehicles WHERE tenant_id = ? AND id = ?'
    const priceBoardQuery =
        'SELECT price FROM priceboard WHERE tenant_id = ? AND id = ?'

    function getVehicle() {
        return new Promise((res, rej) => {
            db.all(vehicleQuery, [tenantId, idVehicle], (err, rows) => {
                if (err) {
                    return rej
                } else {
                    return res(rows)
                }
            })
        })
    }

    function getPriceBoard() {
        return new Promise((res, rej) => {
            db.all(priceBoardQuery, [tenantId, idPriceBoard], (err, rows) => {
                if (err) {
                    console.log('here')
                    return rej(err)
                } else {
                    return res(rows)
                }
            })
        })
    }

    try {
        const tenant = await getTenant(tenantId)

        if (!tenant.length) {
            return res.status(404).send({ error: 'Not Found' })
        }

        const vehicle = await getVehicle()

        const priceboard = await getPriceBoard()

        const name = vehicle[0]?.vehicle_name || null
        const price = priceboard[0]?.price || null

        res.status(200).send({ name, price })
    } catch (e) {
        console.log(e)
        res.status(500).send({ error: 'Internal Server Error' })
    }
}
