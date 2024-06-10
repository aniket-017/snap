"use client";

import * as React from "react";
import Header from "@/components/hr/internal/header";
import { Separator } from "@/components/ui/separator";
import TrackOrderTable from "./tracktable";

export default function TrackOrder() {
  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
        <Header />
        <Separator />
      </div>
      <TrackOrderTable />
    </>
  );
}
