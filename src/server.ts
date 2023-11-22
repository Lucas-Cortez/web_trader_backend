import express from "express";
import cors from "cors";
import "express-async-errors";

import { errorMiddleware } from "application/middlewares/error.middleware";
import { routes } from "application/routes";
// import { EmailConsumer } from "queue/consumers/emailConsumer";
// import { queueOrchestrator } from "queue/queue-orchestrator";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

// const emailConsumer = new EmailConsumer();
// queueOrchestrator.subscribeConsumer("email", emailConsumer, { concurrency: 4, delay: 1000 });
// queueOrchestrator.initializeProcesses();

// app.use("/email", (req, res) => {
//   queueOrchestrator.addToQueue("email", { name: "Alice Santos" });
//   queueOrchestrator.addToQueue("email", { name: "Miguel Oliveira" });
//   queueOrchestrator.addToQueue("email", { name: "Sofia Pereira" });
//   queueOrchestrator.addToQueue("email", { name: "Lucas Silva" });
//   queueOrchestrator.addToQueue("email", { name: "Julia Costa" });
//   queueOrchestrator.addToQueue("email", { name: "Gabriel Rodrigues" });
//   queueOrchestrator.addToQueue("email", { name: "Laura Martins" });
//   queueOrchestrator.addToQueue("email", { name: "Enzo Souza" });
//   queueOrchestrator.addToQueue("email", { name: "Manuela Almeida" });
//   queueOrchestrator.addToQueue("email", { name: "Pedro Lima" });
//   queueOrchestrator.addToQueue("email", { name: "Valentina Ferreira" });
//   queueOrchestrator.addToQueue("email", { name: "Gustavo Gonçalves" });
//   queueOrchestrator.addToQueue("email", { name: "Isabella Rocha" });
//   queueOrchestrator.addToQueue("email", { name: "Matheus Carvalho" });
//   queueOrchestrator.addToQueue("email", { name: "Maria Oliveira" });
//   queueOrchestrator.addToQueue("email", { name: "Rafael Silva" });
//   queueOrchestrator.addToQueue("email", { name: "Beatriz Costa" });
//   queueOrchestrator.addToQueue("email", { name: "João Santos" });
//   queueOrchestrator.addToQueue("email", { name: "Clara Pereira" });
//   queueOrchestrator.addToQueue("email", { name: "Davi Rodrigues" });
//   queueOrchestrator.addToQueue("email", { name: "Ana Almeida" });
//   queueOrchestrator.addToQueue("email", { name: "Arthur Lima" });
//   queueOrchestrator.addToQueue("email", { name: "Heloísa Martins" });
//   queueOrchestrator.addToQueue("email", { name: "Bernardo Souza" });
//   queueOrchestrator.addToQueue("email", { name: "Giovanna Ferreira" });
//   queueOrchestrator.addToQueue("email", { name: "Lorenzo Gonçalves" });
//   queueOrchestrator.addToQueue("email", { name: "Mariana Rocha" });
//   queueOrchestrator.addToQueue("email", { name: "Henrique Carvalho" });
//   queueOrchestrator.addToQueue("email", { name: "Larissa Oliveira" });
//   queueOrchestrator.addToQueue("email", { name: "Leonardo Silva" });
//   queueOrchestrator.addToQueue("email", { name: "Maria Eduarda Costa" });
//   queueOrchestrator.addToQueue("email", { name: "Felipe Rodrigues" });
//   queueOrchestrator.addToQueue("email", { name: "Yasmin Almeida" });
//   queueOrchestrator.addToQueue("email", { name: "Samuel Lima" });
//   queueOrchestrator.addToQueue("email", { name: "Isadora Martins" });
//   queueOrchestrator.addToQueue("email", { name: "Daniel Souza" });
//   queueOrchestrator.addToQueue("email", { name: "Luiza Ferreira" });
//   queueOrchestrator.addToQueue("email", { name: "Vinícius Gonçalves" });
//   queueOrchestrator.addToQueue("email", { name: "Elisa Rocha" });
//   queueOrchestrator.addToQueue("email", { name: "Lucas Carvalho" });

//   res.json({ status: "done" });
// });

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
