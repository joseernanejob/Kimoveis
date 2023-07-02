import { Router } from "express";
import { schedulesController } from "../controllers";
import {
  verifyAdmin,
  verifyBody,
  verifyDate,
  verifyToken,
} from "../middlewares";
import { scheduleSchema } from "../schemas";

const scheduleRouter: Router = Router();

scheduleRouter.post(
  "/",
  verifyToken,
  verifyBody(scheduleSchema.create),
  verifyDate,
  schedulesController.create
);

scheduleRouter.get(
  "/realEstate/:realEstateId",
  verifyToken,
  verifyAdmin,
  schedulesController.read
);

export { scheduleRouter };
