export type PlanId =
  | "ipad-pro-data-edition"
  | "macbook-pro-business"
  | "macbook-max-enterprise";

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  price: number;
  popular?: boolean;
  features: string[];
  icon: "tablet" | "laptop" | "cpu";
}

export type PaymentMethod = "card" | "paystack" | "bank-transfer";

export interface BillingFormValues {
  fullName: string;
  email: string;
  address: string;
  country: string;
  postalCode: string;
}

export interface CardFormValues {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export type CheckoutFormValues = BillingFormValues & Partial<CardFormValues>;

export interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  message: string;
}
