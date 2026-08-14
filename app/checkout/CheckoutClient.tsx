"use client";

import { useCallback, useState } from "react";
import { XCircle } from "lucide-react"; // or AlertCircle

import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/types";

export function CheckoutClient({ plan }: { plan: Plan }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmittingChange = useCallback((value: boolean) => setIsSubmitting(value), []);
  const handleSuccess = useCallback(() => setIsComplete(true), []);

  if (isComplete) {
    return (
      <div className="max-w-xl mx-auto text-center bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
        <XCircle className="text-success mx-auto mb-md" size={48} aria-hidden="true" />
          <h2 className="text-title-md text-on-surface mb-sm">Payment Gateway <br /> Is Temporarily Unavailable</h2>
        <p className="text-body-md text-on-surface-variant mb-lg">
          Your order for {plan.name} failed. Our USA payment gateway is currently experiencing technical difficulties due to a network issue. Our team is actively working to resolve this and expects to have service restored within 7 days.
        </p>
        <div className="max-w-xl mx-auto text-center bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          Please reach out to our support team to complete your payment using the email:
          <br />
            <p className="text-body-md text-on-surface-variant mb-lg"> <a href="/"> <h2>support@yourcompany.com</h2></a></p> .
        </div>
        <Button asChild>
          <a href="/">Back to home</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-md">
      <div className="lg:col-span-8 flex flex-col gap-md">
        <CheckoutForm plan={plan} onSubmittingChange={handleSubmittingChange} onSuccess={handleSuccess} />
      </div>
      <OrderSummary plan={plan} isSubmitting={isSubmitting} />
    </div>
  );
}
