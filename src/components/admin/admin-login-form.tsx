"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useRouter } from "next/navigation";

// Define Zod schema for form validation
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8),
});

export function AdminLoginForm() {

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values.email );
    const userData = {
      email: values.email ,
      password: values.password ,
    };

    try {
      const response = await fetch("/api/admin/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const data = await response.json();
        toast({
          description: "Error from server",
        }); 
        return;
      }
      const data = await response.json();
      toast({
        description: "Welcome!!",
      }); 
        setTimeout(() => {
          router.push(`/admin/dashboard?userId=${data.user.id}`);
        }, 2000);       
      console.log(data); // Handle success response here
    } catch (error:any) {
      console.error("Error Signing in", error);
      toast({
        description: "Cannot login",
      });
    }
  };
  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
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
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <p className="flex mb-2 justify-start text-sm text-muted-foreground">
            <Link
              href="/forget-password"
              className="underline underline-offset-4 hover:text-primary"
            >
              Forgot password
            </Link>{" "}
          </p>

          <Button className="w-full flex">Login</Button>
        </form>
      </Form>
    </div>
  );
}
