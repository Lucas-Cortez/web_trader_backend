import { CreateOrderUseCase } from "application/use-cases/create-order";
import { CreateOrderController } from "./create-order.controller";
import { queueService } from "infra/services/queue";

const createOrderUseCase = new CreateOrderUseCase(queueService);
const createOrderController = new CreateOrderController(createOrderUseCase);

export { createOrderUseCase, createOrderController };
