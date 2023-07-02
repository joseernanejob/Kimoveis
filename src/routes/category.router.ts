import { Router } from "express";
import { categoryController } from "../controllers";
import {
  verifyAdmin,
  verifyCategory,
  verifyCategoryId,
  verifyToken,
} from "../middlewares";

const categoryRouter: Router = Router();

categoryRouter.post(
  "/",
  verifyToken,
  verifyAdmin,
  verifyCategory,
  categoryController.create
);

categoryRouter.get("/", categoryController.read);
categoryRouter.get(
  "/:catId/realEstate",
  verifyCategoryId,
  categoryController.readRealEstateByCat
);

export { categoryRouter };
