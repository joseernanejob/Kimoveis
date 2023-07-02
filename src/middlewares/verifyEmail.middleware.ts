import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories";
import AppError from "../error";

const verifyEmail = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  if (email) {
    const user = await userRepository.findOneBy({ email: email });

    if (user) {
      throw new AppError("Email already exists", 409);
    }
  }

  return next();
};

export { verifyEmail };
