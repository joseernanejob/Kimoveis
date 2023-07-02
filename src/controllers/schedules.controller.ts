import { Request, Response } from "express";
import { schedulesService } from "../services";

const create = async (req: Request, resp: Response): Promise<Response> => {
  const schedule = await schedulesService.create(req.body, resp.locals.user);

  return resp.status(201).json({ message: schedule });
};

const read = async (req: Request, resp: Response): Promise<Response> => {
  const schedules = await schedulesService.read(req.params.realEstateId);
  return resp.status(200).json(schedules);
};

export { create, read };
