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

**Paystack is live and wired up.** Selecting the Paystack tab and clicking Pay Now:

1. Calls `app/api/paystack/init/route.ts` (server-side) which initializes a transaction with
   your `PAYSTACK_SECRET_KEY`.
2. Redirects the full page to Paystack's hosted checkout (`authorization_url`).
3. After payment, Paystack sends the browser back to `/checkout/callback`, which verifies the
   transaction server-side (`transaction/verify`) and shows a success or failure screen.

To enable it:

```bash
cp .env.example .env.local
```

Add your **test** secret key to `.env.local`:

```
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxx
```

Get a free test key from your Paystack dashboard under **Settings → API Keys & Webhooks** — no
business verification needed for test mode. Test payments use Paystack's published test cards.

**Currency conversion:** the site displays prices in USD, but this Paystack account settles in
NGN, so `app/api/paystack/init/route.ts` converts the USD total to NGN before charging, using
the shared rate in `lib/currency.ts` (`USD_TO_NGN_RATE`). That rate is a **static, approximate**
mid-market rate — it will drift as the real exchange rate moves. For anything beyond testing,
replace it with a live rate pulled from an FX API at request time rather than a hardcoded
number. The Paystack tab shows the shopper the actual NGN amount before they're redirected, so
there's no surprise at checkout.

**Card and Bank Transfer are still simulated** (a `setTimeout` in `CheckoutForm.tsx`'s
`onSubmit`) — they don't move real money. To wire up Stripe for the Card tab the same way:

1. Create `app/api/stripe/init/route.ts` that creates a `PaymentIntent` using
   `STRIPE_SECRET_KEY`.
2. In `CheckoutForm.tsx`, add a `paymentMethod === "card"` branch alongside the existing
   `"paystack"` branch that posts to that route and confirms the intent client-side with
   `@stripe/stripe-js` + `@stripe/react-stripe-js`, using `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
3. Call `onSuccess()` once Stripe confirms payment.

## Accessibility & responsiveness notes

- All interactive controls are keyboard reachable with visible focus rings.
- The mobile nav is a full drawer, not a hidden overflow menu.
- Forms surface inline, associated error messages (`role="alert"`) rather than color alone.
- `prefers-reduced-motion` disables the entrance animations.
