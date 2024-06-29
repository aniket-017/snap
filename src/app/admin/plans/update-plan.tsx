"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { planSchema } from "@/schemas/planSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { Plan } from "@/constants/plandata";

interface UpdatePlanSheetProps {
  updateData:Plan;
  isOpen: boolean;
  onClose: () => void;
}

const fetchData = async (endpoint: string) => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return response.json();
};

export function UpdatePlanSheet({
  updateData,
  isOpen,
  onClose,
}: UpdatePlanSheetProps) {
  const form = useForm<z.infer<typeof planSchema>>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      _id:"",
      planName: "",
      company: "",
      products: [],
      status:  "",
      planPrice:0,
      
    },
  });

  const [plans, setPlans] = useState<Plan[]>([]);
  const [companies, setcompanies] = useState([]);
  const [options, setOptions] = useState<Option[]>([]);
  useEffect(() => {
    
      const fetchPlansAndProducts = async () => {
        try {
          const plansData = await fetchData(`/api/plan?id=${updateData._id}`);
          const companyData = await fetchData('/api/customer');
          const productsData = await fetchData('/api/item');
          const productOptions = productsData.data.map((product: { productName: string, _id: string }) => ({
            label: product.productName,
            value: product._id,
        }));
          setcompanies(companyData.data);
          setOptions(productOptions);
          
          console.log("updateData:",updateData);
          setPlans(plansData.data);
          console.log("Plan:",plansData.data);
          const planToUpdate: Plan = plansData.data[0]; // Adjust according to your API response structure
          const productOption: Option[] = updateData.products.map(productId => {
            // Find corresponding product in productOptions and map to Option
            const foundProduct = productOptions.find((option: { label:string,value: string; }) => option.value === productId);
            return foundProduct ? foundProduct : { value: productId, label: 'Unknown Product' };
          });
          const company= companyData.data.find((option:{name:string})=> option.name === updateData.company)
          if(form.control._defaultValues._id == "" ){
          form.reset({
            _id: updateData._id,
            planName: updateData.planName,
            company: company?company._id:"unknown",
            products: productOption,
            status: updateData.status,
            planPrice: updateData.planPrice,
          });
        }
          
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      };
      fetchPlansAndProducts();
  }, [isOpen, updateData, form]);
  
  async function onSubmit(data: z.infer<typeof planSchema>) {
    console.log("update:", data);
    
    try {
      const updatedPlanData = {
        ...updateData,
        id:data._id,
        planName: data.planName,
        company: data.company,
        planPrice: data.planPrice,
        status: data.status,
        products:data.products.map(option => option.value)
    };
    console.log("updatedPlanData",updatedPlanData);
    
    fetch(`/api/plan`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlanData),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Plan updated:', data);
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(updatedPlanData, null, 2)}</code>
          </pre>
        ),
      });
      onClose();
  })
  .catch(error => {
      console.error('Error updating Plan:', error);
      // You can add logic to handle error response
  });
    } catch (error) {
      console.error('Error updating plan:', error);
    }
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    onClose(); // Close the sheet after submission
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update Plan</SheetTitle>
          <SheetDescription>
            Update the Plan details and save the changes
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-screen">
          <Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-5"
            >
                     <FormField
              control={form.control}
              name="planName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan name</FormLabel>
                  <FormControl>
                    <Input  placeholder="Enter the plan name" {...field} />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the company name" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {companies.map((company:{_id:string,name:string,email:string, contract_id:string, cost_rate:number}) => (
                                        <SelectItem key={company._id} value={company._id}>
                                            {company.name}
                                        </SelectItem>
                                    ))}
                
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />



            
            <FormField
          control={form.control}
          name="products"
          render={({ field }) => (
            <FormItem>
              <FormLabel>BGC</FormLabel>
              <FormControl>
                <MultipleSelector
                  value={field.value}
                  onChange={field.onChange}
                  defaultOptions={options}
                  placeholder="Select a BGC"
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />



            <FormField
              control={form.control}
              name="planPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter the price" {...field} />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


<FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
              <Button type="submit">Save changes</Button>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
