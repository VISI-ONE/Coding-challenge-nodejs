const db = require('../shared/db')


exports.allPriceDashboards = function(req, res) {
    const tenantId = req.params.tenantId;
    const query = 'SELECT * FROM priceboard WHERE tenant_id = ?';

    db.all(query, [tenantId], (err, rows) => {
        if (err) {
            console.error('Error retrieving priceboards:', err);
            res.status(500).json({ error: 'Error retrieving priceboards' });
        } else {
            res.status(200).json(rows);
        }
    });
}

exports.allTenants = function(req, res) {
    const query = 'SELECT * FROM tenant';

    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error retrieving tenants:', err);
            res.status(500).json({ error: 'Error retrieving tenants' });
        } else {
            res.status(200).json(rows);
        }
    })
}
