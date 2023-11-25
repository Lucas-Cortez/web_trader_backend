import { prisma } from "infra/config/prisma";
import { Prisma, PrismaPromise } from "@prisma/client";

async function opa() {
  return prisma.user.findMany();
  // const user = await prisma.user.findMany();
  // return user;
  // return "user";
}

export async function transactionWrapper(operation: () => Promise<any>): Promise<void> {
  const eta = await prisma.$transaction(operation);
  // const eta = await prisma.$transaction(opa);
}
