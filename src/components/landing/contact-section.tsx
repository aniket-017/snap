"use client"
import Image from "next/image";
import Link from "next/link";
import { Headset } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Button } from "../ui/button";


// Define Zod schema for form validation
const formSchema = z.object({
    company: z.enum(["Company1", "Company2" , "Company3" ,"Company4" , "Company5" , "Company6" ,"Company7" ,"Company8"  ,"Company9" ,"Company10"]),
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
   
  }); 


const ContactSection = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          company: "Company1",
          firstName: "",
          lastName: "",
          email: "",
          contactUs: "",
        },
      });
    
      const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log({ values });
      };


  return (
    <section className="py-10">
        <div className="flex gap-10 flex-col items-center">
            <div className="mx-auto max-w-3xl text-center space-y-8">
              <span className="border bg-primary text-white cursor-pointer px-3 py-0.5 rounded-full">Contact Us</span>
            </div>
            <p className="text-center max-w-2xl mx-auto mb-5">Every organization is unique and so are Snapcheck background check
            solutions. Talk to an experienced representative to find out how
            Snapcheck can customize the right solutions to make hiring smart,
            fast and easy.</p>
          </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col md:flex-row gap-16">
        <div className="flex md:flex-1">
          <Image
            src="/images/creative-agency-production.webp"
            alt="creative agency "
            width={1300}
            height={1400}
            className="w-full md:h-full object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2 space-y-4  md:py-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
            
              <div className="grid gap-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full" />
                  </div>
                </div>
                <div className="grid gap-2">              

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
                          <FormLabel>Phone No</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter phone number"
                              type="number"
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

                 
                </div>

                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Select industry</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Company1">
                               Government 
                              </SelectItem>
                              <SelectItem value="Company2">
                               Healthcare
                              </SelectItem>
                              <SelectItem value="Company3">
                               Hospitality-Food and Beverage
                              </SelectItem>
                              <SelectItem value="Company4">
                               Manufacturing
                              </SelectItem>
                              <SelectItem value="Company5">
                               Non-profit
                              </SelectItem>
                              <SelectItem value="Company6">
                               Retail
                              </SelectItem>
                              <SelectItem value="Company7">
                              Staffing
                              </SelectItem>
                              <SelectItem value="Company8">
                               Technology
                              </SelectItem>
                              <SelectItem value="Company9">
                               Transportation
                              </SelectItem>
                              <SelectItem value="Company10">
                               Other
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

              
              </div>
             
              <Button type="submit"  variant="hero" className=" mt-4 rounded-full py-3 px-4">
                  Submit
                </Button>
      
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;
