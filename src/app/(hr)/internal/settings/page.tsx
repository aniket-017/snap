"use client";

import * as React from "react";
import { ProfileForm } from "./profile-form";
import Header from "@/components/hr/internal/header";
import { Separator } from "@/components/ui/separator";
import { PlanForm } from "./plan-form";

export default function Settings() {
  return (
    <>
      <div className="flex flex-col  sm:gap-4 sm:py-4  ">
        <Header />
        <Separator />
      </div>
      <ProfileForm />
      <PlanForm />
    </>
  );
}
