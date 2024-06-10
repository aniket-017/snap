"use client";
import React, { useState } from "react";
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

interface UpdateUserSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateUserSheet({
  isOpen,
  onClose,
}: UpdateUserSheetProps ) {
  const form = useForm<z.infer<typeof internalFormSchema>>({
    resolver: zodResolver(internalFormSchema),
    defaultValues: {
     
      
    },
  });
  const [options, setOptions] = useState<Option[]>([]);
  const [organizationAccess, setOrganizationAccess] = useState<string>('internal');
  function onSubmit(data: z.infer<typeof internalFormSchema>) {
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

                    {organizationAccess === 'external' && (
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
                              <SelectItem value="true">View</SelectItem>
                              <SelectItem value="false">View & Download</SelectItem>
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
