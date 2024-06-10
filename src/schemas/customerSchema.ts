import * as z from 'zod';

export const customerSchema = z.object({
  _id:z.string(),
  name: z.string().min(2, { message: "Enter a valid company name" }).max(255, { message: "Enter a valid company name" }),
  email: z.string().email({ message: "Invalid email address" }),
  contract_id: z.string().min(2, { message: "Enter a valid id" }).max(255, { message: "Enter a valid id" }),
  cost_rate: z.coerce.number().min(1, { message: "Enter a valid price" }).max(999999999, { message: "Enter a valid price" }),
});