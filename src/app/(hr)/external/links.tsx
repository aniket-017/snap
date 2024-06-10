import React from 'react';
import { ListPlus, UserPlus, Settings, LayoutDashboard } from 'lucide-react';

export const sidebarNavItems = [
  {
    title: "Track Order",
    href: "/external/trackorder",
    icon: <ListPlus size={20} />,
  },
  {
    title: "Create Order",
    href: "/external/createorder",
    icon: <UserPlus size={20} />,
  },
  {
    title: "Settings",
    href: "/external/settings",
    icon: <Settings size={20} />,
  },
  {
    title: "Dashboard",
    href: "/external/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
];
