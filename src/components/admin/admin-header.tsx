"use client";

import * as React from "react";
import { useEffect } from 'react';
import Link from "next/link";
import {
  Building2,
  PanelLeft,
  LayoutDashboard,
  UserPlus,
  ListPlus,
  Settings,
  FolderKanban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";

export default function AdminHeader() {  
  const router = useRouter();
  const [data, setData] = React.useState("nothing");

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/hr/sign-out", {
        method: "GET",
      });
      if (response.ok) {
        console.log("Logged out successfully");
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Define array of links
  const links = [
    { href: "/admin/dashboard", text: "Dashboard", icon: < LayoutDashboard className="h-5 w-5" /> },
    { href: "/admin/users", text: "Users", icon: <UserPlus className="h-5 w-5" /> },
    // 
    { href: "/admin/plans", text: "Plan ", icon: <FolderKanban className="h-5 w-5" /> },
    { href: "/admin/customers", text: "Customers", icon: <Building2 className="h-5 w-5" /> },
    { href: "/admin/settings", text: "Settings", icon: <Settings className="h-5 w-5" /> },
    
  ];

  return (
    <header className="sticky top-0 z-30 px-2  flex h-14 items-center gap-4 border-b bg-muted/40  px-30 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className=" md:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/" className="font-semibold text-3xl">
              Snapcheck
            </Link>
            {/* Map over links array */}
            {links.map((link, index) => (
              <Link key={index} href={link.href} className="flex items-center gap-4 px-2.5 text-foreground">
                {link.icon}
                {link.text}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex justify-end ml-auto flex-1 md:grow-0">
        <ThemeToggle />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden p-2 rounded-full">
            AB
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/admin/settings')}>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
