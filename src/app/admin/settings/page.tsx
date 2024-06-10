"use client";

import * as React from "react";
import { ProfileForm } from "./profile-form";
import { Separator } from "@/components/ui/separator";
import { PlanForm } from "./plan-form";
import AdminHeader from "@/components/admin/admin-header";

export default function AdminSettings() {
  return (
    <>
      <div className="flex flex-col  sm:gap-4 sm:py-4  ">
        <AdminHeader />
        <Separator />
      </div>
      <ProfileForm />
      {/* <PlanForm /> */}
    </>
  );
}
