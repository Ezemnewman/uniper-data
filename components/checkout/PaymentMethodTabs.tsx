"use client";

import { CreditCard, Landmark, Wallet } from "lucide-react";

import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/types";

const METHODS: { id: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { id: "card", label: "Card", icon: CreditCard },
  { id: "paystack", label: "Paystack", icon: Wallet },
  { id: "bank-transfer", label: "Bank Transfer", icon: Landmark },
];

interface PaymentMethodTabsProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

export function PaymentMethodTabs({ value, onChange }: PaymentMethodTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Payment method">
      {METHODS.map(({ id, label, icon: Icon }) => {
        const isActive = value === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-label-md transition-colors",
              isActive
                ? "border-2 border-primary bg-primary/5 text-primary"
                : "border border-outline-variant bg-surface-bright text-secondary hover:bg-surface-container"
            )}
          >
            <Icon size={20} aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
