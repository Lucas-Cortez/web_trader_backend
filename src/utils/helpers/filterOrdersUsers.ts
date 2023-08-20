import { Profile } from "@prisma/client";
import ms from "ms";

export function filterOrdersUsers(timestamp: number, profiles: Profile[]) {
  const filteredProfiles = profiles.filter((profile) => {
    const lastTransactionSeconds = profile.lastTransaction.getTime();

    const nextTransactionSeconds =
      lastTransactionSeconds + ms(profile.interval);

    return timestamp > nextTransactionSeconds;
  });

  return filteredProfiles;
}
