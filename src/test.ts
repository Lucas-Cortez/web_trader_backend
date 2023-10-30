import { prisma } from "infra/config/prisma";

async function exec() {
  const id = "653e9dc3657df310595b5bed";
  const userId = "653d296a1ea14483e357cd1a";
  const key = "chaveee";

  await prisma.apiKey.create({ data: { key, userId } });
}

exec();
