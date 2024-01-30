const { select } = require('../vehicle/model');
const { fetchVehiclesParamsSchema } = require('./schemas');


async function fetchVehiclesController(req, res) {
    const paramsValidation = fetchVehiclesParamsSchema.validate(req.params);

    if (paramsValidation.error) {
        return res.status(400).json({ message: paramsValidation.error.message });
    }

    const { tenantId } = paramsValidation.value;

    try {
        const rows = await select({ tenantId });
        return res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to fetch vehicles' });
    }
}


module.exports = { fetchVehiclesController };
