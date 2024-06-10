import * as z from 'zod';

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const internalFormSchema = z.object({
  fullName: z.string().min(4, { message: "Invalid Name" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.string({  required_error: "Please select a valid option" }),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters long" }),
  planAccess: z.array(optionSchema).min(1),
  reportAccess: z.string({  required_error: "Please select a valid option" }),
});