import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full p-2.5 flex gap-7">
      <div className="h-full rounded-[25px] border border-white min-w-[255px]"></div>
      <section className="flex w-[80%] flex-col gap-7">
        <div className="bg-white/5 border rounded-[25px] flex h-fit w-full z-30 flex-col ">
          <NavigationSidebar />
        </div>
        <main className="h-full">{children}</main>
      </section>
    </div>
  );
};

export default MainLayout;
