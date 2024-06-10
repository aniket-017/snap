"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";


// Define Zod schema for form validation
const formSchema = z.object({
   licensetype:  z.string({  required_error: "Please select a vaild option "}),
  stateOfIssue: z.string().min(2, { message: 'Enter vaild state' }),
  licenseNumber: z.string().min(10, { message: 'License number must be at least 10 characters long' }).max(22, { message: 'License number cannot be longer than 22 characters long' }),
  status: z.string({  required_error: "Please select a vaild option "}),
  
});

export default function LicenseVerificationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licensetype: '',
      stateOfIssue: '',
      licenseNumber: '',
      certificationType: '',
      status: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "Your license details submitted successfully:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }



  return (
    <>
      <div className="flex justify-center ">
        <Link href="/" className="font-bold py-4 text-2xl lg:text-4xl">
          Snapcheck
        </Link>
      </div>
      <div className="flex justify-center  p-4 ">
        <Card className="w-[550px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">License verification</CardTitle>
                <CardDescription>
                  Please provide your license details for verification.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">

              <FormField
          control={form.control}
          name="licensetype"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select license type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a license type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="InstantDriver">Instant Driver</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="HealthCareCompliance">Health Care Compliance</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
          

                <FormField
                  control={form.control}
                  name="stateOfIssue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State of Issue</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter state of issue" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Number</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter license number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
              
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}
