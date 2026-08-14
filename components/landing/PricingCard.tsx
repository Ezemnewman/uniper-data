"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, Laptop, Tablet, Cpu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import type { Plan } from "@/types";

const ICONS = { tablet: Tablet, laptop: Laptop, cpu: Cpu };

export function PricingCard({ plan }: { plan: Plan }) {
  const router = useRouter();
  const Icon = ICONS[plan.icon];

  function handleChoosePlan() {
    const params = new URLSearchParams({
      plan: plan.id,
      price: plan.price.toString(),
    });
    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <div
      className={
        plan.popular
          ? "relative bg-surface-container-lowest p-md md:p-lg rounded-xl border-2 border-primary shadow-lg flex flex-col h-full lg:-translate-y-4"
          : "bg-surface-container-lowest p-md md:p-lg rounded-xl border border-outline-variant shadow-sm flex flex-col h-full"
      }
    >
      {plan.popular && (
        <Badge className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Most Popular
        </Badge>
      )}

      <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center mb-md">
        <Icon className="text-primary" size={22} aria-hidden="true" />
      </div>

      <h3 className={`text-title-md text-on-surface mb-xs ${plan.popular ? "mt-sm" : ""}`}>{plan.name}</h3>
      <p className="text-body-sm text-on-surface-variant mb-md">{plan.tagline}</p>

      <div className="mb-md">
        <span className={plan.popular ? "text-display-lg text-primary" : "text-display-lg text-on-surface"}>
          {formatCurrency(plan.price)}
        </span>
      </div>

      <ul className="space-y-sm mb-lg flex-grow">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-sm text-body-sm text-on-surface">
            <CheckCircle2 className={plan.popular ? "text-primary" : "text-success"} size={20} aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={plan.popular ? "primary" : "secondary"}
        className="w-full"
        onClick={handleChoosePlan}
      >
        Choose Plan
      </Button>
    </div>
  );
}
