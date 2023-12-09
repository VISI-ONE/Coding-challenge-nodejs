import { Router } from "express";
import TenantRoutes from "./components/tenant/Routes";
import VehicleRoute from "./components/vehicle/Routes";
import VehiclePriceboardPairRoute from "./components/vehile_priceboard_pair/Routes";

const router = Router();

router.use("/tenants", TenantRoutes);
router.use("/vehicles", VehicleRoute);
router.use("/vehicles-priceboard-pairs", VehiclePriceboardPairRoute);

export default router;
