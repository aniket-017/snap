"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define Zod schema for form validation
const formSchema = z.object({
  employerName: z
    .string()
    .min(2, { message: "Employer name must be at least 2 characters long" }),
  contactNumber: z
    .string()
    .min(10, { message: "Contact number must be 10 digits long" }),
  contactEmail: z.string().email({ message: "Invalid email address" }),
  contactFax: z.string().optional(),
  addressType: z.string({ required_error: "Please select a vaild option " }),
  street: z.string().min(2, { message: "Enter a vaild street name " }),
  city: z.string().min(2, { message: "Enter a vaild city name " }),
  stateOrProvince: z.string().min(2, { message: "Enter a vaild state  " }),
  postalCode: z.string().min(5, { message: "Enter a vaild postal code " }),
  country: z.string().min(2, { message: "Enter a vaild country name " }),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" }),
  startDate: z.date({
    required_error: "A date  is required.",
  }),
  endDate: z.date({
    required_error: "A date is required.",
  }),
  jobTitle: z
    .string()
    .min(2, { message: "Job title must be at least 2 characters long" }),
  supervisorName: z
    .string()
    .min(2, { message: "Supervisor name must be at least 2 characters long" }),
  salary: z.string().min(1, { message: "Salary must be a positive number" }),
  reasonForLeaving: z
    .string()
    .min(30, {
      message: "Reason for leaving must be at least 30 characters long",
    })
    .max(100, {
      message: "Reason for leaving must not be more than 100 characters long",
    }),
});

export default function EmploymentVerificationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employerName: "",
      contactNumber: "",
      contactEmail: "",
      contactFax: "",
      addressType: "Domestic",
      street: "",
      city: "",
      stateOrProvince: "",
      postalCode: "",
      country: "",
      firstName: "",
      middleName: "",
      lastName: "",
      startDate: new Date(),
      endDate: new Date(),
      jobTitle: "",
      supervisorName: "",
      salary: "0",
      reasonForLeaving: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "Your details submitted successfully:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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
                <CardTitle className="text-2xl">
                  Employment verification
                </CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quibusdam animi fugiat, dolorum sint adipisci error. Animi
                  dolor
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="employerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employer Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter employer name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Place Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter contact number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Place Contact Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter contact email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactFax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Place Fax</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter fax number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="addressType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select address type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Domestic">Domestic</SelectItem>
                          <SelectItem value="International">
                            International
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter street"
                          {...field}
                        />
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
                        <Input
                          type="text"
                          placeholder="Enter city"
                          {...field}
                        />
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
                        <Input
                          type="text"
                          placeholder="Enter state or province"
                          {...field}
                        />
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
                        <Input
                          type="text"
                          placeholder="Enter postal code"
                          {...field}
                        />
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
                        <Input
                          type="text"
                          placeholder="Enter country"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name of the Applicant</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter first name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name of the Applicant</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter middle name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name of the Applicant</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date of Employment</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date of Employment</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            // selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter job title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supervisorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name of Supervisor</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter supervisor name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter salary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reasonForLeaving"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Leaving</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter reason for leaving"
                          {...field}
                        />
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
