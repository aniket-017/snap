"use cleint" 
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { customerSchema } from "@/schemas/customerSchema"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
export function CreateCustomer() {
  const router = useRouter();
    const form = useForm<z.infer<typeof customerSchema>>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
          _id:"",
          name: "",
          email: "",
          contract_id: "",
          cost_rate: 0,
        },
      });

      async function onSubmit(data: z.infer<typeof customerSchema>) {
        try {
          const response = await fetch('/api/customer', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: data.name,
                email: data.email,
                contract_id: data.contract_id,
                cost_rate: data.cost_rate,
              }),
          });

          const responseData = await response.json();
          if (!response.ok) {
              throw new Error(responseData.message || 'Failed to create customer');
          }
          toast({
            title: "You submitted the following values:",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">Customer Created</code>
              </pre>
            ),
          })
          console.log('Customer created:', data);
          router.push('/admin/dashboard');
      } catch (error) {
          console.error('Error creating customer:', error);
      }
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
      }


  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            
      <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter the company name" {...field} />
                  </FormControl>
                  <FormDescription>  
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter the company email" {...field} />
                  </FormControl>
                  <FormDescription>  
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

             
<FormField
              control={form.control}
              name="contract_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract Id</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter the contract id" {...field} />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="cost_rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost rate </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter the price" {...field} />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        
        <Button type="submit">Create</Button>
      </form>
    </Form>
  )
}