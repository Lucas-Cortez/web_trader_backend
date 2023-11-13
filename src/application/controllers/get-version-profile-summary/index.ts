import { GetVersionProfileSummaryUseCase } from "application/use-cases/get-version-profile-summary";
import { GetVersionProfileSummaryController } from "./get-version-profile-summary.controller";
import { PrismaProfileRepository } from "infra/repositories/prisma/prisma-profile-repository";
import { prisma } from "infra/config/prisma";

const profileRepository = new PrismaProfileRepository(prisma);
const getVersionProfileSummaryUseCase = new GetVersionProfileSummaryUseCase(profileRepository);
const getVersionProfileSummaryController = new GetVersionProfileSummaryController(
  getVersionProfileSummaryUseCase,
);

export { getVersionProfileSummaryUseCase, getVersionProfileSummaryController };
