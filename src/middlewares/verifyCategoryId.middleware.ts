import { Request, Response, NextFunction } from "express";
import { categoryRepository } from "../repositories";
import AppError from "../error";

const verifyCategoryId = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  const category = await categoryRepository.findOneBy({
    id: Number(req.params.catId),
  });

  if (!category) throw new AppError("Category not found", 404);

  return next();
};

export { verifyCategoryId };
