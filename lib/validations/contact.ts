import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.string().trim().min(1, "Enter your email address").email("Enter a valid email address"),
  company: z.string().trim().min(1, "Enter your company name"),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (10 characters minimum)")
    .max(1000, "Message is too long"),
});

export type ContactSchema = z.infer<typeof contactSchema>;
