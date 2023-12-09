import { Router } from "express";
import FetchController from "./FetchController";
import validate from "../../validate";
import { fetchVehicleSchema } from "./ValidationSchema";

const router = Router();

router.route('/').get(validate(fetchVehicleSchema), FetchController);

export default router;