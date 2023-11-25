import { QueuePayloads } from "core/domain/entities/queue-payloads";
import { QueueConfig } from "infra/config/queue-config";
import { PQueueQueueFactory } from "./p-queue/p-queue-queue-factory";

export const queueService = new QueueConfig<QueuePayloads>(new PQueueQueueFactory());
