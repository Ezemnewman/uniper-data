import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Lock } from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { getPlanById, PLANS } from "@/lib/plans";
import { CheckoutClient } from "@/app/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | Uniper Data",
};

interface CheckoutPageProps {
  searchParams: { plan?: string };
}

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
  // The price always comes from the server-side plan catalog, never from the
  // query string, so a tampered `price` param can't change what's charged.
  const plan = getPlanById(searchParams.plan) ?? PLANS[1];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-surface-container-lowest fixed top-0 w-full border-b border-outline-variant shadow-sm z-50 h-16 flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-page mx-auto">
        <Link href="/" className="flex items-center gap-xs">
          <span className="text-title-md font-bold text-primary tracking-tight">Uniper Data</span>
        </Link>
        <div className="flex items-center gap-1 text-secondary">
          <Lock size={18} aria-hidden="true" />
          <span className="text-label-sm ml-1 uppercase tracking-widest">Secure Checkout</span>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-xl container-page w-full">
        <div className="mb-lg">
          <nav aria-label="Breadcrumb" className="flex text-sm text-secondary mb-2">
            <ol className="inline-flex items-center space-x-1">
              <li>
                <Link href="/" className="text-label-md hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight size={16} className="mx-1" />
                <Link href="/#pricing" className="text-label-md hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li className="flex items-center" aria-current="page">
                <ChevronRight size={16} className="mx-1" />
                <span className="text-label-md text-on-surface">Checkout</span>
              </li>
            </ol>
          </nav>
          <h1 className="text-headline-lg-mobile md:text-headline-lg text-on-background">
            Complete Your Purchase
          </h1>
        </div>

        <CheckoutClient plan={plan} />
      </main>

      <Footer />
    </div>
  );
}
