import Joi from "joi";

export const fetchVehicleSchema = Joi.object()
  .keys({
    query: {
      make: Joi.string(),
      model: Joi.string(),
      year: Joi.number().integer(),
      color: Joi.string(),
      license_plate: Joi.string(),
    },
  })
  .unknown(true);
