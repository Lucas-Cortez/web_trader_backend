import express from "express";
import cors from "cors";
import "express-async-errors";
import { errorMiddleware } from "application/middlewares/error-middleware";
// import { EmailConsumer } from "queue/consumers/emailConsumer";
// import { queueOrchestrator } from "queue/queue-orchestrator";
import { routes } from "application/routes";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

// const emailConsumer = new EmailConsumer();
// queueOrchestrator.subscribeConsumer("email", emailConsumer, { concurrency: 2, delay: 1000 });
// queueOrchestrator.initializeProcesses();

// app.use("/email", (req, res) => {
//   queueOrchestrator.addToQueue("email", { name: "joão" });
//   queueOrchestrator.addToQueue("email", { name: "luiz" });
//   queueOrchestrator.addToQueue("email", { name: "lucas" });

//   res.json({ status: "done" });
// });

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
