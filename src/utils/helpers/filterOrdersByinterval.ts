import { ProfileEntity } from "core/domain/entities/profile";
// import { Profile } from "@prisma/client";

export function filterOrdersByinterval(timestamp: number, profiles: ProfileEntity[]) {
  const filteredProfiles = profiles.filter((profile) => {
    return profile.isTimeToAnalyze(timestamp);
  });

  return filteredProfiles;
}

// export function filterOrdersByinterval(timestamp: number, profiles: Profile[]) {
//   const filteredProfiles = profiles.filter((profile) => {
//     const lastTransactionSeconds = profile.lastTransaction.getTime();

//     const nextTransactionSeconds =
//       lastTransactionSeconds + ms(profile.interval);

//     return timestamp > nextTransactionSeconds;
//   });

//   return filteredProfiles;
// }
