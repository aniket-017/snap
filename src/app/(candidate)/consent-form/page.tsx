"use client";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define Zod schema for form validation
const formSchema = z.object({
  company: z.enum(["Company 1", "Company 2"]),
  plan: z.enum(["Plan 1", "Plan 2"]),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  contactUs: z.string().min(10, {
    message: "Contact information must 10 digit",
  }),
  govtID: z
    .string()
    .min(6, { message: "Government ID must be at least 6 characters long" }),
});

export default function ConsentPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "Company 1",
      plan: "Plan 1",
      firstName: "name",
      lastName: "sirname",
      email: "smnaple@gmail.com",
      contactUs: "13232353647578",
      govtID: "453675785",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

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
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl"> Consent Form</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quibusdam animi fugiat, dolorum sint adipisci error. Animi
                  dolor
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                </div>
                <div className="grid gap-2">
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
                              <SelectItem value="Company 1">
                                Company 1
                              </SelectItem>
                              <SelectItem value="Company 2">
                                Company 2
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
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
                </div>

                <p className="px-8 text-center text-sm text-muted-foreground">
                  By clicking submit button, you provide your consent for the
                  respective background check{" "}
                </p>
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
