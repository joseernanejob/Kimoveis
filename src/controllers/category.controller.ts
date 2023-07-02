import { Request, Response } from "express";
import { categoryService } from "../services";

const create = async (req: Request, resp: Response): Promise<Response> => {
  const category = await categoryService.create(req.body);

  return resp.status(201).json(category);
};

const read = async (req: Request, resp: Response): Promise<Response> => {
  const categories = await categoryService.read();

  return resp.status(200).json(categories);
};

const readRealEstateByCat = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const estates = await categoryService.readRealEstateByCat(req.params.catId);

  return resp.status(200).json(estates);
};

export { create, read, readRealEstateByCat };
