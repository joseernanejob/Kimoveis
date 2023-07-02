import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories";
import AppError from "../error";

const verifyId = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;

  const user = await userRepository.findOneBy({ id: Number(userId) });

  if (!user) {
    throw new AppError("User not found", 404);
  }
  resp.locals = { ...resp.locals, user };

  return next();
};

export { verifyId };
