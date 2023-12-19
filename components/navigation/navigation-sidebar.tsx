
import { redirect } from "next/navigation";

import { ModeToggle } from "@/components/mode-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";
import { useWallet } from "@solana/wallet-adapter-react";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();


  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="flex items-center w-full h-full p-3 text-primary">
      <NavigationAction />
      <ScrollArea className="flex flex-1 w-full">
        <div className="flex items-center gap-2.5">
          {servers.map((server) => (
            <div key={server.id}>
              <NavigationItem
                id={server.id}
                name={server.name}
                imageUrl={server.imageUrl}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
      {/* <div className="flex items-center mt-auto gap-x-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div> */}
    </div>
  );
};
