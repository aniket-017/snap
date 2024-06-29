import React from 'react';
import {Building2 , ListPlus, UserPlus, Settings, LayoutDashboard, FolderKanban, ShieldCheck } from 'lucide-react';

export const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: <UserPlus size={20} />,
  },
  {
    title: "BGC",
    href: "/admin/bgc",
    icon: <ShieldCheck size={20} />,
  },
  {
    title: "Plan",
    href: "/admin/plans",
    icon: <FolderKanban size={20} />,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: <Building2 size={20} />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings size={20} />,
  },

];