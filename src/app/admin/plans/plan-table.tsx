import React, { useEffect, useState } from "react";
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
import { PlusCircle} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreatePlan } from "./create-plan";
import { UpdatePlanSheet } from "./update-plan";
import BreadCrumb from "@/components/breadcrumb";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PlanClient} from "./client";
import { plans } from "@/constants/plandata";
import { PlanRequestClient } from "./client.-request";
import { request } from "http";
import { requests } from "@/constants/planrequest";

// Function to fetch data from API
// const fetchData = async (endpoint: string) => {
//   const response = await fetch(endpoint);
//   if (!response.ok) {
//     throw new Error(`Failed to fetch ${endpoint}`);
//   }
//   return response.json();
// };

export default function PlansTable() {
  // const router = useRouter();
  // const [plans, setPlans] = useState([]);
  // const [products, setProducts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 7;

  // useEffect(() => {
  //   const fetchPlansAndProducts = async () => {
  //     try {
  //       const plansData = await fetchData('/api/plan');
  //       const productsData = await fetchData('/api/item');
  //       setPlans(plansData.data);
  //       setProducts(productsData.data);
  //     } catch (err) {
  //       console.error('Error fetching data:', err);
  //     }
  //   };

  //   fetchPlansAndProducts();
  // }, [plans]);

  // const getProductNames = (productIds: any[]) => {
  //   return productIds.map(id => {
  //     const product:any = products.find((product:{ _id: string}) => product._id === id);
  //     return product ? product.productName : id;
  //   }).join(", ");
  // };

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentData = plans.slice(startIndex, endIndex);

  // const handlePageChange = (page: React.SetStateAction<number>) => {
  //   setCurrentPage(page);
  // };

  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  //   const [selectedPlan, setSelectedPlan] = useState(null);
  
  //   const handleEditClick = (plan:any) => {
  //     setSelectedPlan(plan);
  //     setIsEditDialogOpen(true);
  //   };

    // const handleDeleteClick = async (planId: string) => {
    //   if (confirm('Are you sure you want to delete this plan?')) {
    //     try {
    //       const id ={id:planId};
    //       const response = await fetch(`/api/plan/`, {
    //         method: 'DELETE',
    //         headers: {
    //           'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(id),
    //       });
    //       if (response.ok) {
    //         setPlans(plans.filter((plan:{_id:string}) => plan._id !== planId));
    //         alert('Plan deleted successfully');
    //       } else {
    //         alert('Failed to delete plan');
    //       }
    //     } catch (error) {
    //       console.error('Error deleting plan:', error);
    //       alert('Failed to delete plan');
    //     }
    //   }
    // };

    const breadcrumbItems = [
      { title: 'Plans', link: '/admin/plans' },
      // { title: 'Create', link: '/dashboard/user/create' }
    ];
  
 
  return (
    <main className="grid flex-1  items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">
        <BreadCrumb items={breadcrumbItems} />
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="draft" className="hidden sm:flex">
              Plan Requests
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="h-7 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Create plan
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create plan</DialogTitle>
                </DialogHeader>
                <CreatePlan />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Plan</CardTitle>
              <CardDescription>
                Manage your plan and view their statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
            <ScrollArea className="   ">
              <div className="px-1 w-[300px] sm:w-full  py-1">
              <PlanClient data={plans} />
              </div>
              <ScrollBar orientation="horizontal" />
    </ScrollArea>
            </CardContent>
            <CardFooter>
            
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="draft">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Plan requests</CardTitle>
            </CardHeader>
            <CardContent>
            <ScrollArea className="   ">
              <div className="px-1 w-[300px] sm:w-full  py-1">
              <PlanRequestClient data={requests} />
              </div>
              <ScrollBar orientation="horizontal" />
    </ScrollArea>
            </CardContent>
            <CardFooter>
            
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
