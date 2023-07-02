import { Router } from "express";
import { realEstateController } from "../controllers";
import {
  verifyAddress,
  verifyAdmin,
  verifyBody,
  verifyToken,
} from "../middlewares";
import { realEstateSchema } from "../schemas";

const realEstateRouter: Router = Router();

realEstateRouter.post(
  "/",
  verifyToken,
  verifyAdmin,
  verifyBody(realEstateSchema.createRealEstate),
  verifyAddress,
  realEstateController.create
);

realEstateRouter.get("/", realEstateController.read);

export { realEstateRouter };
