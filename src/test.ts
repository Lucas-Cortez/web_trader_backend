import { prisma } from "infra/config/prisma";
import { z } from "zod";

async function exec() {
  const data = await prisma.profile.findMany({
    where: { userId: "65074a4f1e6ec4011eaf8b03" },
    include: { profilestrategy: { include: { strategy: true } } },
  });

  console.log(JSON.stringify(data, null, 2));
}

exec();
