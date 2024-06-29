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
import { internalFormSchema } from "@/schemas/internalFormSchema";
import { User } from "@/constants/userdata";

interface UpdateUserSheetProps {
  isOpen: boolean;
  onClose: () => void;
  updateData:User;
}
const fetchData = async (endpoint: string) => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return response.json();
};

export function UpdateUserSheet({
  updateData,
  isOpen,
  onClose,
}: UpdateUserSheetProps ) {
  const form = useForm<z.infer<typeof internalFormSchema>>({
    resolver: zodResolver(internalFormSchema),
    defaultValues: {
    _id:"",
     fullName:"",
     email:"",
     role:"",
     companyName:"",
     planAccess:[],
     reportAccess:"",
      
    },
  });
  const [options, setOptions] = useState<Option[]>([]);
  const [organizationAccess, setOrganizationAccess] = useState<string>('internal');

  useEffect(() => {
    console.log("updateData",updateData);
    const fetchPlansAndProducts = async () => {
      try {
        const plansData = await fetchData('/api/plan');
        const planOptions = plansData.data.map((plan: { planName: string, _id: string }) => ({
          label: plan.planName,
          value: plan._id,
      }));
        
        setOptions(planOptions);
        
        // Adjust according to your API response structure
        const planOption: Option[] = updateData.plan.map(productId => {
          // Find corresponding product in productOptions and map to Option
          const foundPlan = planOptions.find((option: { label:string,value: string; }) => option.value === productId);
          return foundPlan ? foundPlan : { value: productId, label: 'Unknown Product' };
        });
        console.log("planOption",planOption);
        
        if(form.control._defaultValues._id == "" ){
          form.reset({
            _id: updateData._id,
            fullName: updateData.name,
            companyName: updateData.company?updateData.company:"unknown",
            role:updateData.role,
            planAccess: planOption,
            email: updateData.email,
            reportAccess:updateData.report_access
          });
        }
        
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchPlansAndProducts();
  }, []);
  
  function onSubmit(data: z.infer<typeof internalFormSchema>) {
    console.log("data",data);
    
    try {
      const updatedUserData = {
        ...updateData,
        id:data._id,
        name: data.fullName,
        company: data.companyName,
        email: data.email,
        role: data.role,
        report_access:data.reportAccess,
        plan: data.planAccess.map(option => option.value)
    };
    console.log("updatedUserData",updatedUserData);
    
    fetch(`/api/hr`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
  })
  .then(response => response.json())
  .then(data => {
      console.log('User updated:', data);
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(updatedUserData, null, 2)}</code>
          </pre>
        ),
      });
      onClose();
  })
  .catch(error => {
      console.error('Error updating User:', error);
      // You can add logic to handle error response
  });
    } catch (error) {
      console.error('Error updating User:', error);
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
          <SheetTitle>Update user</SheetTitle>
          <SheetDescription>
            Update the user details and save the changes
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
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter full name"
                              type="text"
                              {...field}
                              autoCapitalize="none"
                              autoComplete="text"
                              autoCorrect="off"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email"
                              type="email"
                              autoCapitalize="none"
                              autoComplete="email"
                              autoCorrect="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Access</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              setOrganizationAccess(value); // Update the state based on selection
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select the organization " />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="internal">Internal</SelectItem>
                              <SelectItem value="external">External</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.control._defaultValues.role === 'external' && (
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter company name"
                                type="text"
                                {...field}
                                autoCapitalize="none"
                                autoComplete="text"
                                autoCorrect="off"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="planAccess"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plan Access</FormLabel>
                          <FormControl>
                            <MultipleSelector
                              value={field.value}
                              onChange={field.onChange}
                              defaultOptions={options}
                              placeholder="Select a plan"
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
                      name="reportAccess"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Report Access</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Report Access" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="view">View</SelectItem>
                              <SelectItem value="view and download">View & Download</SelectItem>
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
