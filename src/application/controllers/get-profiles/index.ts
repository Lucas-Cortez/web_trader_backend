import { GetProfilesUseCase } from "application/use-cases/get-profiles";
import { PrismaProfileRepository } from "infra/repositories/prisma/prisma-profile-repository";
import { GetProfilesController } from "./get-profiles.controller";
import { prisma } from "infra/config/prisma";

const prismaProfileRepository = new PrismaProfileRepository(prisma);
const getProfilesUseCase = new GetProfilesUseCase(prismaProfileRepository);
const getProfilesController = new GetProfilesController(getProfilesUseCase);

export { getProfilesUseCase, getProfilesController };
