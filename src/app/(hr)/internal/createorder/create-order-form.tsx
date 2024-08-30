"use client";

import * as React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

// Define Zod schema for form validation
const formSchema = z.object({
  company: z.string().min(2, { message: "invalid" }),
  plan: z.string().min(2, { message: "invalid" }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  // contactUs: z.string().min(10, { message: "Contact information must be 10 digits" }),
  // govtID: z.string().min(6, { message: "Government ID must be at least 6 characters long" }),
});

const OPTIONS: Option[] = [
  { label: "Plan 1", value: "plan1" },
  { label: "Plan 2", value: "plan2" },
  { label: "Plan 3", value: "plan3" },
  { label: "Plan 4", value: "plan4" },
  { label: "Plan 5", value: "plan5", disable: true },
  { label: "Plan 6", value: "plan6", disable: true },
];

export default function CreateOrderForm() {
  const [user, setUser] = useState({ id: "", name: "", email: "" });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      // contactUs: "",
      // govtID: "",
    },
  });
  const router = useRouter();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getDetails = async () => {
      const res = await fetch("/api/hr/hr", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUser({ id: data.data._id, name: data.data.name, email: data.data.email });
      } else {
        console.error("Failed to fetch HR details:", res.statusText);
      }
    };
    getDetails();

    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/customer");
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        setCompanies(data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchCustomers();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const userData = {
      internalHr: user.id,
      companyName: values.company,
      plan: values.plan,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      // contactNumber: values.contactUs,
      // ssnId: values.govtID,
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

      const data = await response.json();
      console.log("data", data);

      // const response_link = await fetch("/api/candidate/create-link", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email: data.candidate.email, plan: data.candidate.plan }),
      // });

      // if (!response_link.ok) {
      //   throw new Error("Failed to create link");
      // }

      // const data_link = await response_link.json();
      // const mail_response = await fetch("/api/send-mail", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     to: data.candidate.email,
      //     subject: "Link to fill candidate details",
      //     text: data_link.link,
      //   }),
      // });

      // if (!mail_response.ok) {
      //   throw new Error("Failed to send mail");
      // }

      router.push("/internal/dashboard");
    } catch (error) {
      console.error("Error registering user", error);
    }
  }

  return (
    <div className="flex flex-col p-4 w-full lg:w-3/4 sm:gap-4 sm:py-4">
      <Card>
        <CardTitle className="text-xl border-b px-6 py-4">Create new order</CardTitle>
        <CardContent>
          <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select company</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a company" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {companies.map(
                          (company: {
                            _id: string;
                            name: string;
                            email: string;
                            contract_id: string;
                            cost_rate: number;
                          }) => (
                            <SelectItem key={company._id} value={company._id}>
                              {company.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select plan</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="basicfederal">Basic and Federal</SelectItem>
                        <SelectItem value="A La Carte">A La Carte</SelectItem>
                        <SelectItem value="Standard Test Order">Standard Test Order</SelectItem>
                        <SelectItem value="DT Only Test Package">DT Only Test Package</SelectItem>
                        <SelectItem value="MBI Worldwide New Hire Package">MBI Worldwide New Hire Package</SelectItem>
                        <SelectItem value="GA Statewide">GA Statewide</SelectItem>
                        <SelectItem value="invitation">Invitation</SelectItem>
                        <SelectItem value="Test EDD">Test EDD</SelectItem>
                        <SelectItem value="Intl Package">Intl Package</SelectItem>
                        <SelectItem value="Adverse Action Package">Adverse Action Package</SelectItem>
                        <SelectItem value="Safety First">Safety First</SelectItem>
                        <SelectItem value="Corporate Executive Package">Corporate Executive Package</SelectItem>
                        <SelectItem value="New Hire Application">New Hire Application</SelectItem>
                        <SelectItem value="Standard CO Unltd">Standard CO Unltd</SelectItem>
                        <SelectItem value="New Hire Criminal and Drug Screen">
                          New Hire Criminal and Drug Screen
                        </SelectItem>
                        <SelectItem value="Criminal Plus MVR Package">Criminal Plus MVR Package</SelectItem>
                        <SelectItem value="Traveling HealthCare">Traveling HealthCare</SelectItem>
                        <SelectItem value="Annual Employee Rescreen">Annual Employee Rescreen</SelectItem>
                        <SelectItem value="Annual ReScreen Package">Annual ReScreen Package</SelectItem>
                        <SelectItem value="GA test package">GA test package</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
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
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter last name"
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

              {/* <FormField
                control={form.control}
                name="contactUs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Us</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter contact information"
                        type="tel"
                        autoComplete="tel"
                        autoCapitalize="none"
                        autoCorrect="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* <FormField
                control={form.control}
                name="govtID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Government Identification No</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter government ID"
                        type="number"
                        autoComplete="govt-id"
                        autoCapitalize="none"
                        autoCorrect="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
