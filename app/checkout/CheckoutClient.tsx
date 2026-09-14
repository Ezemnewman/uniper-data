"use client";

import { useCallback, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { PaymentUnavailable } from "@/components/checkout/PaymentUnavailable";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/types";

export function CheckoutClient({ plan }: { plan: Plan }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isGatewayUnavailable, setIsGatewayUnavailable] = useState(false);

  const handleSubmittingChange = useCallback((value: boolean) => setIsSubmitting(value), []);
  const handleSuccess = useCallback(() => setIsComplete(true), []);
  const handleGatewayUnavailable = useCallback(() => setIsGatewayUnavailable(true), []);

  if (isComplete) {
    return (
      <div className="max-w-xl mx-auto text-center bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
        <CheckCircle2 className="text-success mx-auto mb-md" size={48} aria-hidden="true" />
        <h2 className="text-title-md text-on-surface mb-sm">Payment successful</h2>
        <p className="text-body-md text-on-surface-variant mb-lg">
          Your order for {plan.name} is confirmed. A receipt and setup instructions are on their
          way to your inbox.
        </p>
        <Button asChild>
          <a href="/">Back to home</a>
        </Button>
      </div>
    );
  }

  if (isGatewayUnavailable) {
    return <PaymentUnavailable planName={plan.name} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-md">
      <div className="lg:col-span-8 flex flex-col gap-md">
        <CheckoutForm
          plan={plan}
          onSubmittingChange={handleSubmittingChange}
          onSuccess={handleSuccess}
          onGatewayUnavailable={handleGatewayUnavailable}
        />
      </div>
      <OrderSummary plan={plan} isSubmitting={isSubmitting} />
    </div>
  );
}
