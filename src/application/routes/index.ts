import { Router } from "express";
import { createUserController } from "application/controllers/create-user";
import { bindController } from "utils/helpers/bind-controllers";

const routes = Router();

// routes.post("/user", bindController(createUserController));

export { routes };
