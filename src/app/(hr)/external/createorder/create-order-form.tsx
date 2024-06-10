"use client";

import * as React from "react";
import * as z from "zod";
import {   useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';


const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

// Define Zod schema for form validation
const formSchema = z.object({
  frameworks: z.array(optionSchema).min(1),
  company: z.enum(["Company 1", "Company 2"]),
  plan: z.enum(["Plan 1", "Plan 2"]),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  contactUs: z
    .string()
    .min(10, {
      message: "Contact information must 10 digit",
    }),
  govtID: z
    .string()
    .min(6, { message: "Government ID must be at least 6 characters long" }),
});


const OPTIONS: Option[] = [
  { label: 'Plan 1', value: 'plan1' },
  { label: 'Plan 2', value: 'plan2' },
  { label: 'Plan 3', value: 'plan3' },
  { label: 'Plan 4', value: 'plan4' },
  { label: 'Plan 5', value: 'plan5', disable: true },
  { label: 'Plan 6', value: 'plan6', disable: true },
 
];

export default function CreateOrderForm() {
  const [user, setUser] = useState({id:"",name:"",email:""});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactUs: "",
      govtID: "",
    },
  });
  const router= useRouter();

  useEffect(() => {
    const getDetails = async () =>{
      const res:any = await fetch("/api/hr/hr", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (res.ok) {
        const data = await res.json(); // Parse JSON response body
        console.log("HR details:", data.data._id);
        setUser({id:data.data._id,name:data.data.name,email:data.data.email})
        console.log(user);
        

      } else {
        // Handle non-successful response
        console.error("Failed to fetch HR details:", res.statusText);
      };
      
    }
    getDetails();
    
  }, []);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });
    console.log("user",user);

    const userData = {
      internalHr:user.id,
      companyName: values.company,
      plans: values.plan,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      contactNumber: values.contactUs,
      ssnId: values.govtID,
      status: "created", 
    };

    try {
      const response = await fetch("/api/candidate/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      router.push("/internal/dashboard");
      const data = await response.json();
      console.log(data); // Handle success response here
    } catch (error) {
      console.error("Error registering user", error);
      // Handle error here
    }
    
  };

  return (
    <div className="flex flex-col  p-4 w-full lg:w-3/4 sm:gap-4 sm:py-4 ">
      <Card>
        <CardTitle className=" text-xl border-b px-6 py-4">
          Create new order
        </CardTitle>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-3"
            >
              
            <FormField
            control={form.control}
            name="company"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Select company</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Company 1">Company 1</SelectItem>
                      <SelectItem value="Company 2">Company 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

           <FormField
          control={form.control}
          name="frameworks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan</FormLabel>
              <FormControl>
                <MultipleSelector
                  value={field.value}
                  onChange={field.onChange}
                  defaultOptions={OPTIONS}
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
            name="plan"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Select plan</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a plan " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Plan 1">Plan 1</SelectItem>
                      <SelectItem value="Plan 2">Plan 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
             

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter first name"
                          type="text"
                          {...field}
                          autoCapitalize="none"
                          autoComplete="text"
                          autoCorrect="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter  last name"
                          type="text"
                          {...field}
                          autoCapitalize="none"
                          autoComplete="text"
                          autoCorrect="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
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
                  );
                }}
              />

              <FormField
                control={form.control}
                name="contactUs"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Contact Us</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter  contact information"
                          type="tel"
                          autoComplete="tel"
                          autoCapitalize="none"
                          autoCorrect="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="govtID"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Government Identification No</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter  government ID"
                          type="number"
                          autoComplete="govt-id"
                          autoCapitalize="none"
                          autoCorrect="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
             
                <Button type="submit">Submit</Button>
            
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}