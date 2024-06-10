"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { UpdateTaskSheet } from "./update-sheet";

interface Order {
  name: string;
  adjudication: string;
  status: string;
  created: string;
  completed: string;
}

// Sample JSON data conforming to the Order interface
const sampleData: Order[] = [
  {
    name: "Laser Lemonade Machine",
    adjudication: "tes1@gmail.com",
    status: "Due",
    created: "2023-07-12 10:42 AM",
    completed: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    adjudication: "tes1@gmail.com",
    status: "Created",
    created: "2023-07-12 10:42 AM",
    completed: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    adjudication: "tes1@gmail.com",
    status: "Started",
    created: "2023-07-12 10:42 AM",
    completed: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    adjudication: "tes1@gmail.com",
    status: "Completed",
    created: "2023-07-12 10:42 AM",
    completed: "2023-07-12 10:42 AM",
  },

  {
    name: "Laser Lemonade Machine",
    adjudication: "tes1@gmail.com",
    status: "Completed",
    created: "2023-07-12 10:42 AM",
    completed: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    adjudication: "tes1@gmail.com",
    status: "Completed",
    created: "2023-07-12 10:42 AM",
    completed: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    adjudication: "tes1@gmail.com",
    status: "Completed",
    created: "2023-07-12 10:42 AM",
    completed: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    adjudication: "tes1@gmail.com",
    status: "Completed",
    created: "2023-07-12 10:42 AM",
    completed: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    adjudication: "tes1@gmail.com",
    status: "Completed",
    created: "2023-07-12 10:42 AM",
    completed: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    adjudication: "tes1@gmail.com",
    status: "Completed",
    created: "2023-07-12 10:42 AM",
    completed: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    adjudication: "tes1@gmail.com",
    status: "Completed",
    created: "2023-07-12 10:42 AM",
    completed: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    adjudication: "NA",
    status: "Completed",
    created: "2023-07-12 10:42 AM",
    completed: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    adjudication: "NA",
    status: "Completed",
    created: "2023-07-12 10:42 AM",
    completed: "2023-07-12 10:42 AM",
  },


];


enum BadgeVariant {
  Default = "default",
  Destructive = "destructive",
  Outline = "outline",
  Secondary = "secondary",
  Pending = "pending",
  Success = "success",
  OutlineDestructive = "outlinedestructive",
}

export default function TrackOrderTable() {
  const router = useRouter();

  function getBadgeVariant(status: string): BadgeVariant {
    switch (status.toLowerCase()) {
      case "started":
        return BadgeVariant.Outline;
      case "created":
        return BadgeVariant.Pending;
      case "completed":
        return BadgeVariant.Success;
      case "due":
        return BadgeVariant.OutlineDestructive;
      default:
        return BadgeVariant.Default;
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const [isUpdateSheetOpen, setIsUpdateSheetOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Order | null>(null);


  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  // Function to handle download report
  const handleDownloadReport = () => {
   
    const pdfUrl = "/pdf/smaple.pdf";
  
   
    const anchorElement = document.createElement("a");
  
    
    anchorElement.href = pdfUrl;
  
   
    anchorElement.download = "report.pdf";
  
   
    anchorElement.click();
  
   
    anchorElement.remove();
  };

  const handleEditTask = (task: Order) => {
    setSelectedTask(task);
    setIsUpdateSheetOpen(true);
  };

  
  return (
    <main className="grid flex-1  items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="create">Started</TabsTrigger>
            <TabsTrigger value="active" className="hidden sm:flex">
              Created
            </TabsTrigger>
            <TabsTrigger value="done">Completed</TabsTrigger>
            <TabsTrigger value="draft" className="hidden sm:flex">
              Due
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button
              size="sm"
              className="h-7 gap-1"
              onClick={() => router.push("/internal/createorder")}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Create order
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Track Order</CardTitle>
              <CardDescription>
                Manage your order and view their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden lg:table-cell">
                     Email
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Created
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Completed
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleData
                    .slice(startIndex, endIndex)
                    .map((order, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {order.name}
                        </TableCell>
                        <TableCell className="font-medium hidden lg:table-cell">
                          {order.adjudication}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getBadgeVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {order.created}
                        </TableCell>
                        <TableCell className="hidden  lg:table-cell">
                          {order.completed}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem >Preview</DropdownMenuItem>
                              <DropdownMenuItem onClick={handleDownloadReport}>Download report</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditTask(order)}>Edit</DropdownMenuItem>
                            
                <Separator/>
                              <DropdownMenuItem className="text-destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              {/* <div className="text-xs text-muted-foreground">
                Showing <strong>{startIndex + 1}-{Math.min(endIndex, sampleData.length)}</strong> of <strong>{sampleData.length}</strong> Orders
              </div> */}
              {/* Pagination controls */}
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">{currentPage}</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </TabsContent>
        {selectedTask && (
        <UpdateTaskSheet
         
          open={isUpdateSheetOpen}
          onOpenChange={(open) => setIsUpdateSheetOpen(open)}
        />
      )}
      </Tabs>
    </main>
  );
}
