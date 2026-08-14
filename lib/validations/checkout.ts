import { z } from "zod";

export const billingSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80, "Name is too long"),
  email: z.string().trim().min(1, "Enter your email address").email("Enter a valid email address"),
  address: z.string().trim().min(5, "Enter your street address").max(160, "Address is too long"),
  country: z.string().min(1, "Select a country"),
  postalCode: z.string().trim().min(3, "Enter a valid postal code").max(12, "Enter a valid postal code"),
});

export const cardSchema = z.object({
  cardName: z.string().trim().min(2, "Enter the name on the card"),
  cardNumber: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => /^\d{13,19}$/.test(val), { message: "Enter a valid card number" }),
  expiry: z
    .string()
    .trim()
    .refine((val) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), { message: "Use MM/YY format" }),
  cvv: z
    .string()
    .trim()
    .refine((val) => /^\d{3,4}$/.test(val), { message: "Enter a valid CVV" }),
});

export const checkoutSchema = billingSchema.merge(cardSchema);

export type BillingSchema = z.infer<typeof billingSchema>;
export type CardSchema = z.infer<typeof cardSchema>;
export type CheckoutSchema = z.infer<typeof checkoutSchema>;
