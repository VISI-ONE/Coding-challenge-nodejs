const { selectById: selectVehicleById, update } = require('../vehicle/model');
const { selectById: selectPriceBoardById } = require('../priceboard/model');
const { pairPayloadSchema, pairParamsSchema } = require('./schemas');

async function pairController(req, res) {
    const paramsValidation = pairParamsSchema.validate(req.params);
    if (paramsValidation.error) {
        return res.status(400).json({ message: paramsValidation.error.message });
    }

    const payloadValidation = pairPayloadSchema.validate(req.body);
    if (payloadValidation.error) {
        return res.status(400).json({ message: payloadValidation.error.message });
    }

    const { tenantId } = paramsValidation.value;
    const { vehicleId, priceBoardId } = payloadValidation.value;

    const vehicle = await selectVehicleById({ vehicleId });
    if (!vehicle || vehicle.tenant_id !== tenantId) {
        return res.status(404).json({ message: 'Vehicle not found' });
    }

    const priceBoard = await selectPriceBoardById({ priceBoardId });
    if (!priceBoard || priceBoard.tenant_id !== tenantId) {
        return res.status(404).json({ message: 'Priceboard not found' });
    }

    try {
        await update(vehicleId, { priceBoardId });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to pair vehicle' });
    }

    return res.status(200).json({ message: 'Pairing successful' });
}


module.exports = { pairController };
