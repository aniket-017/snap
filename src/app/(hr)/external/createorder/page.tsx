"use client";

import * as React from "react";

import Header from "@/components/hr/internal/header";

import CreateOrderForm from "./create-order-form";
import { Separator } from "@/components/ui/separator";

export default function CreateOrder() {
  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
        <Header />
        <Separator />
      </div>
{/*       <CreateOrderForm /> */}
    </>
  );
}
