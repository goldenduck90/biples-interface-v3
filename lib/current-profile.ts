

import { db } from "@/lib/db";

export const currentProfile = async () => {
  const walletId = "41ifa2Pwc4Ur6nii6yythZhxg2mjDrkzKsrbTUKJ5yBB";

  const profile = await db.profile.findUnique({
    where: {
      userId: walletId,
    },
  });

  console.log("profile", profile);

  return profile;
};
