import { createApiKeyController } from "application/controllers/create-api-key";
import { deleteApiKeyController } from "application/controllers/delete-api-key";
import { authMiddleware } from "application/middlewares/auth.middleware";
import { Router } from "express";

const apiKeyRoutes = Router();

apiKeyRoutes.post("/", authMiddleware.inject(), createApiKeyController.inject());
apiKeyRoutes.delete("/", authMiddleware.inject(), deleteApiKeyController.inject());

export { apiKeyRoutes };
