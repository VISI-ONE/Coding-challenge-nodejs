import { Router } from "express";

import {
  getVehiclesController,
  pairVehicleWithPriceboardController,
} from "../controllers/index.js";

export const vehicleRouter = Router();

vehicleRouter.get("/vehicles", getVehiclesController);

vehicleRouter.get("/vehiclepricepair", pairVehicleWithPriceboardController);

// export default vehicleRouter;
