import { Request, Response, NextFunction } from "express";
import AppError from "../error";

const verifyAdmin = (
  req: Request,
  resp: Response,
  next: NextFunction
): void => {
  if (!resp.locals.decoded.admin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export { verifyAdmin };
