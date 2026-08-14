import { PLANS } from "@/lib/plans";
import { PricingCard } from "@/components/landing/PricingCard";

export function PricingSection() {
  return (
    <section id="pricing" className="container-page py-xl">
      <div className="text-center mb-lg">
        <h2 className="text-headline-lg-mobile md:text-headline-lg text-on-surface mb-sm">
          Hardware Plans
        </h2>
        <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
          Select the precise tools for your enterprise needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md items-center">
        {PLANS.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
}
