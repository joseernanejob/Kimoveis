import { Router } from "express";
import { userController } from "../controllers";
import {
  verifyAdmin,
  verifyBody,
  verifyEmail,
  verifyId,
  verifyToken,
} from "../middlewares";
import { userSchema } from "../schemas";

const userRouter: Router = Router();

userRouter.post(
  "/",
  verifyBody(userSchema.userCreate),
  verifyEmail,
  userController.create
);

userRouter.get("/", verifyToken, verifyAdmin, userController.read);

userRouter.use("/:userId", verifyId);

userRouter.patch(
  "/:userId",
  verifyBody(userSchema.userUpdate),
  verifyEmail,
  verifyToken,
  userController.update
);

userRouter.delete(
  "/:userId",
  verifyToken,
  verifyAdmin,
  userController.destroyer
);

export { userRouter };
