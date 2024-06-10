"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { adminprofileSchema } from "@/schemas/admin-profile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import BreadCrumb from "@/components/breadcrumb";

export function ProfileForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof adminprofileSchema>>({
    resolver: zodResolver(adminprofileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      resetpassword: "",
    },
  });
  const [admin_id, setAdmin_Id] = useState("");

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await fetch("/api/admin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          console.log("Admin details:", data.data);
          setAdmin_Id(data.data._id);

          form.setValue("firstName", data.data.first_name);
          form.setValue("lastName", data.data.last_name);
          form.setValue("email", data.data.email);
        } else {
          console.error("Failed to fetch Admin details:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };
    getDetails();
  }, []);

  const handleSubmit = async (values: z.infer<typeof adminprofileSchema>) => {
    console.log({ values });
    try {
      const updatedAdminData = {
        id: admin_id,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.resetpassword,
      };

      const response = await fetch('/api/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAdminData),
      });

      if (!response.ok) {
        throw new Error('Failed to update Admin');
      }

      const data = await response.json();
      
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  const breadcrumbItems = [
    { title: 'Settings', link: '/admin/settings' },
    // { title: 'Create', link: '/dashboard/user/create' }
  ];

  return (
    <div className="w-full lg:w-3/4 p-3">
        <BreadCrumb items={breadcrumbItems} />
      <Card className="mt-4">
        <CardTitle className="text-xl  border-b px-6 py-4">Profile</CardTitle>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
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
                        disabled
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
                name="resetpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reset password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter new password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                Update changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
