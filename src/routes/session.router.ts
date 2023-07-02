import { Router } from "express";
import { sessionController } from "../controllers";

const sessionRouter: Router = Router();

sessionRouter.post("/", sessionController.create);

export { sessionRouter };
