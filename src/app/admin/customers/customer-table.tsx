import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "./client";
// import { users } from "./data";
import { CreateCustomer } from "./cerate-customers";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function CustomersTable() {
  const router = useRouter();

  const [user, setUser] = useState([]);

  useEffect(() => {
      const fetchPlansAndProducts = async () => {
        try {
          const response = await fetch('/api/customer');
          if (!response.ok) {
            throw new Error(`Failed to fetching customers`);
          }
          const data=await response.json();
          console.log("Response data:",data.data[0]);
          
          setUser(data.data);
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      };
  
      fetchPlansAndProducts();
    }, []);

  const breadcrumbItems = [
    { title: 'Customers', link: '/admin/customers' },
  ];

  return (
    <main className="grid flex-1  items-start gap-4  p-4 sm:px-6 sm:py-4 md:gap-8">
      <BreadCrumb items={breadcrumbItems} />
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="h-7 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Create customer
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create plan</DialogTitle>
                </DialogHeader>
               <CreateCustomer/>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <TabsContent value="all">
          <Card >
            <CardHeader>
              <CardTitle>Customers</CardTitle>
              <CardDescription>
                Manage your customers and view their statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
            <ScrollArea className="   ">
              <div className="px-1 w-[300px] sm:w-full  py-1">
              <UserClient data={user} />
              </div>
              <ScrollBar orientation="horizontal" />
    </ScrollArea>
            </CardContent>

          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
