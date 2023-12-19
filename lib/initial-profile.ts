

import { db } from "@/lib/db";

export const initialProfile = async () => {
  const walletId = "41ifa2Pwc4Ur6nii6yythZhxg2mjDrkzKsrbTUKJ5yBB";

  const profile = await db.profile.findUnique({
    where: {
      userId: walletId,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: walletId,
      name: "John Doe",
      imageUrl: "https://i.pravatar.cc/300",
      email: "test@test.com",
    },
  });

  return newProfile;
};
