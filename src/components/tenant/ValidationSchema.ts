import Joi from "joi";

export const getTenantPriceboardsSchema = Joi.object().keys({
    params: Joi.object().keys({
        id: Joi.number().integer().positive()
    })
}).unknown(true)