import { NextFunction, Request, Response } from "express";
import { Injectable } from "./injectable";

export abstract class Middleware implements Injectable<Middleware["handle"]> {
  abstract handle(request: Request, response: Response, next: NextFunction): void;

  inject() {
    return this.handle.bind(this);
  }
}
