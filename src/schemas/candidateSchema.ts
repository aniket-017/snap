import { z } from 'zod';

// Define the schema for the Candidate model
export const CandidateSchema = z.object({
    internalHr: z.string(), 
    companyName: z.string().min(2).max(255),
    plans: z.string().min(2).max(255),
    firstName: z.string().min(2).max(100),
    lastName: z.string().min(2).max(100),
    email: z.string().email(),
    contactNumber: z.string().min(10).max(20),
    ssnId: z.string().min(9).max(9),
    status: z.string().default('created'),
});
