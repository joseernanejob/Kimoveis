import { Request, Response } from "express";
import { sessionService } from "../services";

const create = async (req: Request, resp: Response): Promise<Response> => {
  const { email, password } = req.body;
  const session = await sessionService.create(email, password);

  return resp.status(200).json({ token: session });
};

export { create };
