# Uniper Data

Enterprise data solutions marketing site and checkout flow, built with Next.js App Router,
TypeScript, Tailwind CSS, and Lucide icons.

## Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS, design tokens matched to the original Stitch UI
- **Icons:** lucide-react
- **Forms:** React Hook Form + Zod
- **UI primitives:** Hand-rolled shadcn-style components on top of Radix (`Select`, `Label`, `Slot`)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  layout.tsx            Root layout, Inter font
  page.tsx               Landing page (/)
  checkout/
    page.tsx              Checkout page (server component, reads ?plan=)
    CheckoutClient.tsx     Client state: submitting / success

components/
  layout/                Navbar, Footer
  landing/                Hero, StatsBar, About, Services, Pricing, Gallery, Contact
  checkout/               CheckoutForm, OrderSummary, PaymentMethodTabs
  ui/                     Button, Input, Label, Select, Card, Badge, FormError

lib/
  plans.ts                Pricing catalog (single source of truth for prices)
  utils.ts                cn() class merge helper, formatCurrency()
  validations/            Zod schemas for checkout and contact forms

types/index.ts           Shared TypeScript types
```

## How checkout pricing works

Pricing cards link to `/checkout?plan=<planId>` (see `PricingCard.tsx`). The checkout page
looks up the plan **server-side** from `lib/plans.ts` by id — it does not trust a `price`
query param — so the amount charged can't be tampered with via the URL.

## Wiring up real payments

The payment tab switcher (`PaymentMethodTabs.tsx`) and `CheckoutForm.tsx` currently simulate a
network call on submit. To connect a real gateway:

1. **Stripe:** create a server action or route handler (`app/api/checkout/route.ts`) that creates
   a `PaymentIntent` using `STRIPE_SECRET_KEY`, and confirm it client-side with
   `@stripe/stripe-js` + `@stripe/react-stripe-js` using `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
2. **Paystack:** create a route handler that initializes a transaction with
   `PAYSTACK_SECRET_KEY`, then redirect the browser to the returned `authorization_url`.
3. Replace the `await new Promise(...)` simulation in `CheckoutForm.tsx`'s `onSubmit` with a
   `fetch()` call to your route handler, and call `onSuccess()` once the provider confirms
   payment (e.g. from a webhook-backed status check or the redirect callback).

Copy `.env.example` to `.env.local` and fill in your sandbox keys before wiring this up.

## Accessibility & responsiveness notes

- All interactive controls are keyboard reachable with visible focus rings.
- The mobile nav is a full drawer, not a hidden overflow menu.
- Forms surface inline, associated error messages (`role="alert"`) rather than color alone.
- `prefers-reduced-motion` disables the entrance animations.
