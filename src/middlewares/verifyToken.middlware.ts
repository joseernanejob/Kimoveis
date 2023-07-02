import { Request, Response, NextFunction } from "express";
import AppError from "../error";
import { verify } from "jsonwebtoken";

const verifyToken = (
  req: Request,
  resp: Response,
  next: NextFunction
): void => {
  const authorization: string | undefined = req.headers.authorization;

  if (!authorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const [_bearer, token] = authorization.split(" ");

  verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    resp.locals = { ...resp.locals, decoded };
  });

  return next();
};

export { verifyToken };
