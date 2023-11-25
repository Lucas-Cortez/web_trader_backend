import express from "express";
import cors from "cors";
import "express-async-errors";

import { errorMiddleware } from "application/middlewares/error.middleware";
import { routes } from "application/routes";
// import { EmailConsumer } from "queue/consumers/emailConsumer";
// import { queueService } from "infra/services/queue";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

// const emailConsumer = new EmailConsumer();
// queueService.subscribe("order", emailConsumer, { concurrency: 4, delay: 1000 });
// queueService.init();

// app.use("/email", (req, res) => {
//   // queueService.addToQueue('order', {})

//   res.json({ status: "done" });
// });

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
