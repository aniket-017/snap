"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode; // New property for icon
  }[];
}

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import { LogOut } from "lucide-react";

export default function SideNav({
  className,
  items,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Side Panel */}
      
      <aside className=" inset-y-0 h-full bg-muted/40  left-0 z-10 hidden w-60 flex-col border-r sm:flex">
        <nav className="flex flex-col  items-center gap-2  sm:py-4">
          <div className="flex  h-14 w-full items-center border-b  lg:h-[54px]">
            <div className="flex justify-center items-center w-full">
              <Link href="/" className="font-semibold text-3xl">
                Snapcheck
              </Link>
            </div>
          </div>
          {/* <Separator className="mt-5" /> */}

          <nav
            className={cn("flex flex-col px-2  mt-5 w-full gap-3", className)}
            {...props}
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  pathname === item.href
                    ? "bg-primary   text-white dark:text-white"
                    : " bg-muted/40 hover:bg-background ",
                  "flex items-center justify-start px-4 py-2"
                )}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </nav>
       
      </aside>
    </>
  );
}
