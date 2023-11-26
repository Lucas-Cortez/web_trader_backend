import express from "express";
import cors from "cors";
import "express-async-errors";

import { errorMiddleware } from "application/middlewares/error.middleware";
import { routes } from "application/routes";
import { orderConsumer } from "application/consumers/order-consumer";
import { queueService } from "infra/services/queue";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

queueService.subscribe("order", orderConsumer, { concurrency: 5, delay: 1000 });
queueService.init();

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
