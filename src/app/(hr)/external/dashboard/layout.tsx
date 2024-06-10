import { Metadata } from "next";
import SideNav from "@/components/hr/internal/sidebar";
import { sidebarNavItems } from "@/app/(hr)/external/links";

export const metadata: Metadata = {
  title: "Snapcheck",
  description: "Snapcheck",
};

interface DashBoardLayoutProps {
  children: React.ReactNode;
}


export default function DashBoardLayout({ children }: DashBoardLayoutProps) {
  return (
    <>
      <div className="flex min-h-screen w-full  ">
        <div className="hidden md:block">
          <SideNav items={sidebarNavItems} />
        </div>

        <div className="w-full ">{children}</div>
      </div>
    </>
  );
}
