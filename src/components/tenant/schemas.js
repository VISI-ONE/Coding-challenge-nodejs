const joi = require('joi');


const pairPayloadSchema = joi.object({
    vehicleId: joi.number().integer().required(),
    priceBoardId: joi.number().integer().required(),
});

const pairParamsSchema = joi.object({
    tenantId: joi.number().integer().required(),
});

const fetchPriceBaordsParamsSchema = joi.object({
    tenantId: joi.number().integer().required(),
});

const fetchVehiclesParamsSchema = joi.object({
    tenantId: joi.number().integer().required(),
});

module.exports = { pairPayloadSchema, pairParamsSchema, fetchPriceBaordsParamsSchema, fetchVehiclesParamsSchema };
