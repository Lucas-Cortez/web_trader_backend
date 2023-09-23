import { CreateProfileUseCase } from "application/use-cases/create-profile";
import { prisma } from "infra/config/prisma";
import { PrismaProfileRepository } from "infra/repositories/prisma/prisma-profile-repository";
import { CreateProfileController } from "./create-profile.controller";

const profileRepository = new PrismaProfileRepository(prisma);
const createProfileUseCase = new CreateProfileUseCase(profileRepository);
const createProfileController = new CreateProfileController(createProfileUseCase);

export { createProfileUseCase, createProfileController };
