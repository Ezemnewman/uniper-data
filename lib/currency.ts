// The site displays prices in USD, but Paystack settlement currency here is
// NGN, so charges must be converted. This is a static approximate
// mid-market rate (checked August 2026) — it WILL drift over time.
// For production use, replace this with a live rate fetched from an FX API
// (e.g. exchangerate.host, Open Exchange Rates) rather than a hardcoded
// constant, or at minimum update this value regularly.
export const USD_TO_NGN_RATE = 1362;

export function convertUsdToNgn(amountUsd: number): number {
  return amountUsd * USD_TO_NGN_RATE;
}

export function formatNgn(amountNgn: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(amountNgn);
}
