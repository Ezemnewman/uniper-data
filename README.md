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

## Payments

**No payment gateway is currently connected.** All three tabs behave as follows:

- **Card** and **Bank Transfer** are simulated (a `setTimeout` in `CheckoutForm.tsx`'s
  `onSubmit`) — clicking Pay Now shows the success screen without moving real money.
- **Paystack** shows `components/checkout/PaymentUnavailable.tsx` — a "temporarily unavailable"
  screen that directs the shopper to email support to complete payment manually. It does not
  call any payment API.

### Reconnecting Paystack

A previous version of this project had a real Paystack integration (server-side transaction
init + redirect + verification callback). To bring it back:

1. Create `app/api/paystack/init/route.ts` — a route handler that calls Paystack's
   `transaction/initialize` endpoint using a `PAYSTACK_SECRET_KEY`, and returns the
   `authorization_url` it responds with.
2. Create `app/checkout/callback/page.tsx` — a server component that reads the `reference` query
   param Paystack redirects back with, calls `transaction/verify`, and shows success/failure.
3. In `CheckoutForm.tsx`, replace the `paymentMethod === "paystack"` block (currently just calls
   `onGatewayUnavailable()`) with a `fetch("/api/paystack/init")` call, and
   `window.location.href = data.authorization_url` on success.
4. Since the site displays USD but Paystack typically settles in NGN, you'll also need a
   USD→NGN conversion before charging — use a live FX rate rather than a hardcoded one.
5. `cp .env.example .env.local` and add your test `PAYSTACK_SECRET_KEY` (free from your Paystack
   dashboard under **Settings → API Keys & Webhooks**, no business verification needed for test
   mode).

### Wiring up Stripe for Card

1. Create `app/api/stripe/init/route.ts` that creates a `PaymentIntent` using
   `STRIPE_SECRET_KEY`.
2. In `CheckoutForm.tsx`, replace the simulated `paymentMethod === "card"` flow with a call to
   that route, then confirm the intent client-side with `@stripe/stripe-js` +
   `@stripe/react-stripe-js`, using `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
3. Call `onSuccess()` once Stripe confirms payment.

## Accessibility & responsiveness notes

- All interactive controls are keyboard reachable with visible focus rings.
- The mobile nav is a full drawer, not a hidden overflow menu.
- Forms surface inline, associated error messages (`role="alert"`) rather than color alone.
- `prefers-reduced-motion` disables the entrance animations.
