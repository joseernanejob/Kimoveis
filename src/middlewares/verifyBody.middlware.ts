import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const verifyBody =
  (schema: z.AnyZodObject) =>
  (req: Request, resp: Response, next: NextFunction): void => {
    const body = schema.parse(req.body);
    resp.locals = { ...resp.locals, body };

    return next();
  };

export { verifyBody };
