import { Request, Response } from "express";
import { get } from "./Model";

export default async function (req: Request, res: Response) {
  const { make, model, year, color, license_plate } = req.query as any;

  const vehicles = await get({ make, model, year, color, license_plate });

  res.status(200).json(vehicles);
}
