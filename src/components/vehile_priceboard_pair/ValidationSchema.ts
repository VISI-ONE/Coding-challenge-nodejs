import Joi from "joi";

export const createSchema = Joi.object()
  .keys({
    body: {
      vehicle_id: Joi.number().required(),
      priceboard_id: Joi.number().required(),
    },
  })
  .unknown(true);
