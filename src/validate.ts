import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export default function (schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req);

    if (!error) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      res.status(400).json({ error: message });
    }
  };
}
