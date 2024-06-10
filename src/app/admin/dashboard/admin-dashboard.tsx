"use client"
import Link from "next/link"
import {
  ArrowUpRight,
  CreditCard,
  ListTodo,
  UserRoundSearch,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"

interface Plan {
  _id: string;
  planName: string;
  planPrice: number;
}

interface Item {
  _id: string;
}

interface HR {
  _id: string;
  id?: string;
  name: string;
  email: string;
  company: string;
}

export function AdminDashboard() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [HRs, setHRs] = useState<HR[]>([]);
  const [recentHR, setRecentHR] = useState<HR[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plan');
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }
        const data = await response.json();
        setPlans(data.data); 
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await fetch('/api/item');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data.data); 
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    const fetchHRs = async () => {
      try {
        const response = await fetch('/api/hr');
        if (!response.ok) {
          throw new Error('Failed to fetch HRs');
        }
        const data = await response.json();
        setHRs(data.data);
        const lastIndex = data.data.length - 1;
        const startIndex = Math.max(0, lastIndex - 4);
        setRecentHR(data.data.slice(startIndex, lastIndex + 1).reverse()); 
      } catch (error) {
        console.error('Error fetching HRs:', error);
      }
    };

    fetchPlans();
    fetchItems();
    fetchHRs();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h2 className="ml-2 text-xl lg:text-2xl font-bold tracking-tight ">
  Hi, Welcome back <span className="shake">👋</span>
</h2>

        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Link href="/admin/internal">
            <Card x-chunk="dashboard-01-chunk-3" className="hover:border-primary hover:bg-muted/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Users</CardTitle>
                <UserRoundSearch className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{HRs.length}</div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="#">
            <Card x-chunk="dashboard-01-chunk-1" className="hover:border-primary hover:bg-muted/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/admin/plans">
            <Card x-chunk="dashboard-01-chunk-2" className="hover:border-primary hover:bg-muted/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Plans</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{plans.length}</div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="#">
            <Card x-chunk="dashboard-01-chunk-0" className="hover:border-primary hover:bg-muted/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">BGC</CardTitle>
                <ListTodo className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{items.length}</div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Users</CardTitle>
                <CardDescription>Recent added users</CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/admin/users">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden xl:table-column">Type</TableHead>
                    <TableHead className="hidden xl:table-column">Status</TableHead>
                    <TableHead className="hidden xl:table-column">Date</TableHead>
                    <TableHead className="text-right">Company name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentHR.map((hr) => (
                    <TableRow key={hr.id || hr._id}>
                      <TableCell>
                        <div className="font-medium">{hr.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {hr.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">Sale</TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">Approved</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">2023-06-23</TableCell>
                      <TableCell className="text-right">{hr.company}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent plans</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {plans.map((plan) => (
                <div key={plan._id} className="flex items-center gap-4">
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">{plan.planName}</p>
                  </div>
                  <div className="ml-auto font-medium">+${plan.planPrice}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
