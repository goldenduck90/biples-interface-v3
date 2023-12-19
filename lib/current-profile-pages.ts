import { NextApiRequest } from "next";

import { db } from "@/lib/db";

export const currentProfilePages = async (req: NextApiRequest) => {
  const walletId = "41ifa2Pwc4Ur6nii6yythZhxg2mjDrkzKsrbTUKJ5yBB";

  if (!walletId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: walletId,
    },
  });

  return profile;
};
