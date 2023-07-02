import { Request, Response } from "express";
import { realEstateService } from "../services";

const create = async (req: Request, resp: Response): Promise<Response> => {
  const realEstate = await realEstateService.create(resp.locals.body);
  return resp.status(201).json(realEstate);
};

const read = async (req: Request, resp: Response): Promise<Response> => {
  const realEstates = await realEstateService.read();
  return resp.status(200).json(realEstates);
};

export { create, read };
