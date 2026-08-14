"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/ui/form-error";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PaymentMethodTabs } from "@/components/checkout/PaymentMethodTabs";
import { billingSchema, cardSchema, type BillingSchema, type CardSchema } from "@/lib/validations/checkout";
import { TAX_RATE } from "@/lib/plans";
import type { PaymentMethod, Plan } from "@/types";

const COUNTRIES = ["United States", "United Kingdom", "Canada", "Nigeria", "Germany"];

const formSchema = billingSchema.merge(cardSchema.partial());
type FormValues = BillingSchema & Partial<CardSchema>;

interface CheckoutFormProps {
  plan: Plan;
  onSubmittingChange: (isSubmitting: boolean) => void;
  onSuccess: () => void;
}

export function CheckoutForm({ plan, onSubmittingChange, onSuccess }: CheckoutFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { country: COUNTRIES[0] },
  });

  useEffect(() => {
    onSubmittingChange(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);

  async function onSubmit(values: FormValues) {
    setPaymentError(null);

    if (paymentMethod === "paystack") {
      const total = plan.price * (1 + TAX_RATE);
      try {
        const response = await fetch("/api/paystack/init", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            // Paystack expects the amount in the smallest currency unit
            // (e.g. kobo for NGN), so multiply by 100 and round to be safe.
            amount: Math.round(total * 100),
            planId: plan.id,
            planName: plan.name,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.authorization_url) {
          setPaymentError(data.error ?? "Could not start the Paystack checkout. Please try again.");
          return;
        }

        // Full-page redirect to Paystack's hosted checkout — the browser
        // leaves this app until Paystack sends the user back to
        // /checkout/callback, which verifies the transaction server-side.
        window.location.href = data.authorization_url;
      } catch {
        setPaymentError("Could not reach the payment server. Please try again.");
      }
      return;
    }

    // Card and bank transfer are not yet wired to a real gateway — see
    // README.md for how to connect Stripe here the same way Paystack is
    // connected above.
    if (paymentMethod === "card") {
      const cardResult = cardSchema.safeParse(values);
      if (!cardResult.success) {
        return;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1400));
    console.log("Checkout submission:", { ...values, paymentMethod });
    onSuccess();
  }

  return (
    <>
      {/* Billing Details */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md md:p-lg shadow-sm">
        <h2 className="text-title-md text-on-surface mb-6 flex items-center gap-2">
          <span className="bg-primary-fixed text-primary w-8 h-8 rounded-full flex items-center justify-center text-label-md">
            1
          </span>
          Billing Information
        </h2>

        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" placeholder="John Doe" hasError={!!errors.fullName} {...register("fullName")} />
              <FormError message={errors.fullName?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                hasError={!!errors.email}
                {...register("email")}
              />
              <FormError message={errors.email?.message} />
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <Label htmlFor="address">Street address</Label>
              <Input
                id="address"
                placeholder="123 Enterprise Way, Suite 400"
                hasError={!!errors.address}
                {...register("address")}
              />
              <FormError message={errors.address?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="country">Country</Label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="country" hasError={!!errors.country}>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FormError message={errors.country?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="postalCode">Postal code</Label>
              <Input id="postalCode" placeholder="94105" hasError={!!errors.postalCode} {...register("postalCode")} />
              <FormError message={errors.postalCode?.message} />
            </div>
          </div>
        </form>
      </section>

      {/* Payment Method */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md md:p-lg shadow-sm">
        <h2 className="text-title-md text-on-surface mb-6 flex items-center gap-2">
          <span className="bg-primary-fixed text-primary w-8 h-8 rounded-full flex items-center justify-center text-label-md">
            2
          </span>
          Payment Method
        </h2>

        <PaymentMethodTabs value={paymentMethod} onChange={setPaymentMethod} />

        {paymentMethod === "card" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="md:col-span-2 flex flex-col gap-2">
              <Label htmlFor="cardName">Cardholder name</Label>
              <Input
                id="cardName"
                placeholder="Name on card"
                hasError={!!errors.cardName}
                form="checkout-form"
                {...register("cardName")}
              />
              <FormError message={errors.cardName?.message} />
            </div>

            <div className="md:col-span-2 flex flex-col gap-2 relative">
              <Label htmlFor="cardNumber">Card number</Label>
              <Controller
                name="cardNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    id="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    className="font-mono pr-12"
                    hasError={!!errors.cardNumber}
                    form="checkout-form"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    maxLength={23}
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 19);
                      const grouped = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
                      field.onChange(grouped);
                    }}
                  />
                )}
              />
              <CreditCard className="absolute right-4 top-[38px] text-outline-variant" size={20} aria-hidden="true" />
              <FormError message={errors.cardNumber?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="expiry">Expiry date</Label>
              <Controller
                name="expiry"
                control={control}
                render={({ field }) => (
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    className="font-mono"
                    hasError={!!errors.expiry}
                    form="checkout-form"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    maxLength={5}
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
                      const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
                      field.onChange(formatted);
                    }}
                  />
                )}
              />
              <FormError message={errors.expiry?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="cvv" className="flex justify-between">
                CVV
              </Label>
              <Controller
                name="cvv"
                control={control}
                render={({ field }) => (
                  <Input
                    id="cvv"
                    placeholder="123"
                    className="font-mono"
                    hasError={!!errors.cvv}
                    form="checkout-form"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    maxLength={4}
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  />
                )}
              />
              <FormError message={errors.cvv?.message} />
            </div>
          </div>
        )}

        {paymentMethod === "paystack" && (
          <p className="text-body-sm text-on-surface-variant">
            You&apos;ll be redirected to Paystack&apos;s secure checkout to complete this payment
            after clicking Pay Now.
          </p>
        )}

        {paymentError && (
          <p className="text-body-sm text-error mt-4" role="alert">
            {paymentError}
          </p>
        )}

        {paymentMethod === "bank-transfer" && (
          <p className="text-body-sm text-on-surface-variant">
            Bank transfer instructions and a reference number will be emailed to you after clicking
            Pay Now.
          </p>
        )}
      </section>
    </>
  );
}
