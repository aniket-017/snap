import { Metadata } from "next";
import { LayoutDashboard, UserPlus, ListPlus, Settings } from "lucide-react";
import SideNav from "@/components/hr/internal/sidebar";

export const metadata: Metadata = {
  title: "Snapcheck",
  description: "Snapcheck",
};

// Usage of the SideNav component
const sidebarNavItems = [
  {
    title: "Track Order",
    href: "/internal/trackorder",
    icon: <ListPlus size={20} />,
  },

  {
    title: "Create Order",
    href: "/internal/createorder",
    icon: <UserPlus size={20} />,
  },
 
  {
    title: "Settings",
    href: "/internal/settings",
    icon: <Settings size={20} />,
  },
  {
    title: "Dashboard",
    href: "/internal/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
];

interface CreateOrderLayoutProps {
  children: React.ReactNode;
}

export default function CreateOrderLayout({
  children,
}: CreateOrderLayoutProps) {
  return (
    <>
      <div className="flex min-h-screen w-full  ">
        <div className="hidden md:block">
          <SideNav items={sidebarNavItems} />
        </div>

        <div className=" w-full">{children}</div>
      </div>
    </>
  );
}
