"use client";
import * as React from "react";
import { Separator } from "@/components/ui/separator";
import AdminHeader from "@/components/admin/admin-header";
// import BgcTable from "./bgc-table";
import BreadCrumb from '@/components/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormGenerator from "./FormGenerator";


export default function CreateBgcPage() {
    const breadcrumbItems = [
        { title: 'Bgc', link: '/admin/bgc' },
        { title: 'Create Bgc', link: '/dashboard/bgc/create-bgc' }
      ];
  return (
    <>
    <div className="flex flex-col sm:gap-4 sm:py-4 ">
      <AdminHeader />
      <Separator />
    </div>
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex gap-6 w-full">
        {/* <FormList /> */}
        <Tabs defaultValue="editor" className="w-full">
        
          <TabsList className="grid w-1/2 mx-aut grid-cols-2">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent className="w-full" value="editor">
          <FormGenerator />
          </TabsContent>
          <TabsContent value="preview">
            {/* <Preview /> */}
          </TabsContent>
        </Tabs>
      </div>
    </main>
    </>    
  );
}
