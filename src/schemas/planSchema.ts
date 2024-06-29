import * as z from 'zod';

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const planSchema = z.object({
  _id:z.string(),
  planName: z.string().min(2, { message: "Enter a valid plan name" }).max(255, { message: "Enter a valid plan name" }),
  company: z.string({  required_error: "Please select a valid option" }),
  products: z.array(optionSchema).min(1),
  status:  z.string({  required_error: "Please select a valid option" }),
  planPrice: z.coerce.number().min(1, { message: "Enter a valid price" }).max(999999999, { message: "Enter a valid price" }),
});