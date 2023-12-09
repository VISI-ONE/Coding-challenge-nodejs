import { Router } from "express";
import CreateController from "./CreateController";
import validate from "../../validate";
import { createSchema } from "./ValidationSchema";

const router = Router();

router.route("/").post(validate(createSchema), CreateController);

export default router;
