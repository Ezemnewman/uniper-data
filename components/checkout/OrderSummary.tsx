import { Laptop, Lock, ShieldCheck, Tablet, Cpu } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { TAX_RATE } from "@/lib/plans";
import type { Plan } from "@/types";

const ICONS = { tablet: Tablet, laptop: Laptop, cpu: Cpu };

interface OrderSummaryProps {
  plan: Plan;
  isSubmitting: boolean;
}

export function OrderSummary({ plan, isSubmitting }: OrderSummaryProps) {
  const tax = plan.price * TAX_RATE;
  const total = plan.price + tax;
  const Icon = ICONS[plan.icon];

  return (
    <div className="lg:col-span-4 relative">
      <Card className="sticky top-24 p-md">
        <h3 className="text-title-md text-on-surface mb-6 border-b border-outline-variant pb-4">
          Order Summary
        </h3>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-surface-container rounded-lg flex items-center justify-center shrink-0 border border-outline-variant">
            <Icon className="text-secondary" size={28} aria-hidden="true" />
          </div>
          <div className="flex-grow">
            <h4 className="text-label-md text-on-surface font-semibold">{plan.name}</h4>
            <p className="text-body-sm text-secondary">Annual Data Plan Included</p>
          </div>
          <div className="text-label-md text-on-surface font-semibold text-right whitespace-nowrap">
            {formatCurrency(plan.price)}
          </div>
        </div>

        <div className="space-y-3 border-t border-outline-variant pt-4 mb-6">
          <div className="flex justify-between text-body-sm text-on-surface-variant">
            <span>Subtotal</span>
            <span>{formatCurrency(plan.price)}</span>
          </div>
          <div className="flex justify-between text-body-sm text-on-surface-variant">
            <span>Tax (Estimated {Math.round(TAX_RATE * 100)}%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-outline-variant pt-4 mb-8">
          <span className="text-title-md text-on-surface">Total</span>
          <span className="text-title-md text-primary font-bold">{formatCurrency(total)}</span>
        </div>

        <button
          type="submit"
          form="checkout-form"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary-container disabled:opacity-60 disabled:cursor-not-allowed text-white text-label-md py-4 rounded-lg flex justify-center items-center gap-2 transition-colors shadow-sm"
        >
          <Lock size={20} aria-hidden="true" />
          {isSubmitting ? "Processing..." : "Pay Now"}
        </button>

        <div className="mt-4 flex items-center justify-center gap-2 text-secondary text-label-sm">
          <ShieldCheck size={16} aria-hidden="true" />
          <span>Secured by SSL Encryption</span>
        </div>
      </Card>
    </div>
  );
}
