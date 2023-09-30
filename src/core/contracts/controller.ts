import { Request, Response } from "express";
import { Injectable } from "./injectable";

// export interface Controller {
//   handle(request: Request, response: Response): Promise<Response>;
// }

export abstract class Controller implements Injectable<Controller["handle"]> {
  abstract handle(request: Request, response: Response): Promise<Response>;

  inject() {
    return this.handle.bind(this);
  }
}
