import { Request, Response, NextFunction } from "express";
import { categoryRepository } from "../repositories";
import AppError from "../error";

const verifyCategory = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  const { name } = req.body;
  const category = await categoryRepository.findOneBy({ name: name });

  if (category) {
    throw new AppError("Category already exists", 409);
  }

  return next();
};

export { verifyCategory };
