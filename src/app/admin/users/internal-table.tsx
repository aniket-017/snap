import * as React from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateInternalForm } from "./create-internalhr";
import { useEffect, useState } from "react";
import BreadCrumb from '@/components/breadcrumb';
import { users } from "@/constants/userdata";
import { UsersClient } from "./client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";


const fetchData = async (endpoint: string) => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return response.json();
};

export default function InternalTable() {
  const router = useRouter();
  const [HRs, setHRs] = useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedHR, setSelectedHR] = useState(null);

  useEffect(() => {
    const fetchPlansAndProducts = async () => {
      try {
        const hrsData = await fetchData('/api/hr');
        // const productsData = await fetchData('/api/item');
        // setPlans(plansData.data);
        setHRs(hrsData.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchPlansAndProducts();
  }, [HRs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditClick = (hr:any) => {
    setSelectedHR(hr);
    console.log("selected hr from table: ",selectedHR);
    
    setIsUpdateOpen(true);
  };

  const handleDeleteClick = async (hrId: string) => {
    if (confirm('Are you sure you want to delete this HR?')) {
      try {
        const id ={id:hrId};
        const response = await fetch(`/api/hr/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
        });
        if (response.ok) {
          setHRs(HRs.filter((hr:{_id:string}) => hr._id !== hrId));
          alert('HR deleted successfully');
        } else {
          alert('Failed to delete HR');
        }
      } catch (error) {
        console.error('Error deleting HR:', error);
        alert('Failed to delete users');
      }
    }
  };

  const breadcrumbItems = [
    { title: 'Users', link: '/admin/users' },
    // { title: 'Create', link: '/dashboard/user/create' }
  ];

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">
        <BreadCrumb items={breadcrumbItems} />
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <CreateInternalForm />
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage your Users and view their details</CardDescription>
            </CardHeader>
            <CardContent>
            <ScrollArea className="   ">
              <div className="px-1 w-[300px] sm:w-full  py-1">
              < UsersClient data={users} />
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
