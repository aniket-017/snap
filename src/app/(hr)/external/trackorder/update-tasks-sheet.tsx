'use client'
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"


interface UpdateTaskSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});


const OPTIONS: Option[] = [
  { label: 'Plan 1', value: 'plan1' },
  { label: 'Plan 2', value: 'plan2' },
  { label: 'Plan 3', value: 'plan3' },
  { label: 'Plan 4', value: 'plan4' },
  { label: 'Plan 5', value: 'plan5', disable: true },
  { label: 'Plan 6', value: 'plan6', disable: true },
 
];

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

export function UpdateTaskSheet({ open, onOpenChange }: UpdateTaskSheetProps) {
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

  

      const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log({ values })
      }

  return (
   
    <Sheet onOpenChange={onOpenChange} open={open}>
      
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update Task</SheetTitle>
          <SheetDescription>Update the task details and save the changes</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-screen ">
        <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-3 p-5"
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
          </ScrollArea>
      </SheetContent>
      
    </Sheet>
  
  );
}