import { Request, Response } from "express";
import { userService } from "../services";

const create = async (req: Request, resp: Response): Promise<Response> => {
  const user = await userService.create(req.body);

  return resp.status(201).json(user);
};

const read = async (req: Request, resp: Response): Promise<Response> => {
  const users = await userService.read();

  return resp.status(200).json(users);
};

const update = async (req: Request, resp: Response): Promise<Response> => {
  const user = await userService.update(
    req.body,
    resp.locals.decoded.admin,
    resp.locals.decoded.sub,
    resp.locals.user
  );

  return resp.status(200).json(user);
};

const destroyer = async (req: Request, resp: Response): Promise<Response> => {
  await userService.destroy(resp.locals.user);

  return resp.status(204).json();
};

export { create, read, update, destroyer };
