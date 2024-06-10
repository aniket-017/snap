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

// Define Zod schema for form validation
const formSchema = z.object({
  street: z.string().min(2, { message: 'Street must be at least 2 characters long' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters long' }),
  stateOrProvince: z.string().min(2, { message: 'State or province must be at least 2 characters long' }),
  postalCode: z.string().min(5, { message: 'Postal code must be at least 5 characters long' }),
  country: z.string().min(2, { message: 'Country must be at least 2 characters long' }),
});

export default function AddressVerificationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: '',
      city: '',
      stateOrProvince: '',
      postalCode: '',
      country: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "Your address details submitted successfully:",
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
                <CardTitle className="text-2xl">Address verification</CardTitle>
                <CardDescription>
                  Please provide your address details for verification.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stateOrProvince"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State or Province</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter state or province" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter postal code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter country" {...field} />
                      </FormControl>
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
