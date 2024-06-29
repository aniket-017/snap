import { Metadata } from "next";
import SideNav from "@/components/hr/internal/sidebar";
import { sidebarNavItems } from "@/app/admin/links";

export const metadata: Metadata = {
  title: "Snapcheck Admin",
  description: "Snapcheck Admin",
};

interface CustomersLayoutProps {
  children: React.ReactNode;
}


export default function CustomersLayout({ children }: CustomersLayoutProps) {
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
