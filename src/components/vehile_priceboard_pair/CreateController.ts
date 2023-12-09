import { Request, Response } from "express";
import { create, getByVehicleIdAndTenantId } from "./Model";
import { getVehicleById } from "../vehicle";
import { Priceboard, Vehicle, VehiclePriceboardPair } from "../../errors";
import { getPriceboardsById } from "../priceboard";

export default async function (req: Request, res: Response) {
  const { vehicle_id, priceboard_id } = req.body as any;

  const vehicle = await getVehicleById(vehicle_id);

  if (!vehicle) {
    res.status(404).json({ message: Vehicle.notFound });
    return;
  }

  const priceboard = await getPriceboardsById(priceboard_id);

  if (!priceboard) {
    res.status(404).json({ message: Priceboard.notFound });
    return;
  }

  if (vehicle.tenant_id !== priceboard.tenant_id) {
    res.status(409).json({ message: VehiclePriceboardPair.conflict });
    return;
  }

  const existingPair = await getByVehicleIdAndTenantId({
    vehicle_id,
    priceboard_id,
  });

  if (existingPair) {
    res.status(409).json({ message: VehiclePriceboardPair.alreadyExists });
    return;
  }

  const vehicles = await create({ vehicle_id, priceboard_id });

  res.status(200).json(vehicles);
}
