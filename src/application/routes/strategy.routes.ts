import { getAllStrategiesController } from "application/controllers/get-all-strategies";
import { Router } from "express";

const strategyRoutes = Router();

strategyRoutes.get("/", getAllStrategiesController.inject());

export { strategyRoutes };
