import { Request, Response, NextFunction } from "express";
import AppError from "../error";
import { ZodError } from "zod";

const handleError = (
  error: Error,
  req: Request,
  resp: Response,
  next: NextFunction
): Response => {
  if (error instanceof AppError) {
    return resp.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return resp.status(400).json({ message: error.flatten().fieldErrors });
  }
  return resp.status(400).json();
};

export { handleError };
