import { z } from 'zod';

// Define the schema for the Candidate model
export const adminprofileSchema = z.object({
  firstName: z.string().min(2, { message: "Enter a valid first name" }).max(50, { message: "Enter a valid first name" }),
  lastName: z.string().min(2, { message: "Enter a valid last name" }),
  email: z.string().email("Invalid email address"),
  resetpassword: z.string().min(8, "Password must be at least 8 characters").optional().or(z.literal("")),
});
