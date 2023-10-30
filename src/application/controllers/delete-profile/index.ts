import { PrismaProfileRepository } from "infra/repositories/prisma/prisma-profile-repository";
import { DeleteProfileController } from "./delete-profile.controller";
import { DeleteProfileUseCase } from "application/use-cases/delete-profile";
import { prisma } from "infra/config/prisma";

const prismaProfileRepository = new PrismaProfileRepository(prisma);
const deleteProfileUseCase = new DeleteProfileUseCase(prismaProfileRepository);
const deleteProfileController = new DeleteProfileController(deleteProfileUseCase);

export { deleteProfileUseCase, deleteProfileController };
