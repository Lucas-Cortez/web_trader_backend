import { prisma } from "infra/config/prisma";
import { z } from "zod";

type CreateProfileInput = {
  interval: string;
  symbol: string;
  userId: string;
  strategiesIds: string[];
};

async function exec() {
  const createProfileSchema = z.object({
    interval: z.string(),
    symbol: z.string(),
    userId: z.string(),
    strategiesIds: z.string().array().min(1, "must contain at least one strategy id"),
  });

  createProfileSchema.parse({
    interval: "z.string()",
    symbol: "z.string()",
    userId: "z.string()",
    strategiesIds: [],
  });
}

exec();
