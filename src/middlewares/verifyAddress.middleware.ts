import { Request, Response, NextFunction } from "express";
import AppError from "../error";
import { addressRepository } from "../repositories";

const verifyAddress = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  const address = await addressRepository.findOneBy({
    zipCode: req.body.address.zipCode,
  });

  if (address) throw new AppError("Address already exists", 409);

  return next();
};

export { verifyAddress };
