"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

export default function ForgetPassword() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          email: "",
        },
      })
      const [error, setError] = useState<string>("");
      const router= useRouter()
    
      async function onSubmit(email: z.infer<typeof FormSchema>) {
        try {
            const response:any = await fetch("/api/users/reset-password", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(email),
            });
      
            if (!response.ok) {
              const data = await response.json();
              setError(data.message);
              return;
            }
            const data = await response.json();
            console.log(data.user);
            try {
                const mail_response:any = await fetch("/api/send-mail", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({to:email.email,subject:"Link to change your password",text:data.link}),
                  });
                
                  if (!mail_response.ok) {
                    const data = await mail_response.json();
                    setError(data.message);
                    return;
                  }
                  const mail_data = await mail_response.json()
                  setError(mail_data.message);
            } catch (error) {
                
            }
          } catch (error) {
            console.error("Error Signing in", error);
            // Handle error here
          }
        
      }
  return (
    <>
    <div className="flex justify-center ">
            <Link
              href="/"
              className="font-bold py-4 text-2xl lg:text-4xl"
            >
              Snapcheck
            </Link>
          </div>
    <div className="flex justify-center  p-4 items-center h-screen">
        <Card className="w-[550px]">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Forgot your password?</CardTitle>
        <CardDescription>
        Enter your email address below and we&apos;ll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          
        </div>
        <div className="grid gap-2">
        {error && (
        <p className="text-red-500">{error}</p> // Display error message if present
      )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
          <Input id="email" type="email" placeholder="m@example.com" {...field} />
          </FormControl>
          <FormMessage />
            </FormItem>
          )}
          />
        </div>
       
      </CardContent>
      <CardFooter>
              <Button type="submit" className="w-full">Send Email</Button>
            </CardFooter>
          </form>
          </Form>
    </Card>
    </div>
    </>
  );
}