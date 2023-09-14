import { Controller } from "core/contracts/controller";
import { Request, Response } from "express";

export const bindController = (controller: Controller) => {
  return (req: Request, res: Response) => controller.handle(req, res);
};
