import { Plan } from "@/types";

export const TAX_RATE = 0.08;

export const PLANS: Plan[] = [
  {
    id: "ipad-pro-data-edition",
    name: "iPad Pro Data Edition",
    tagline: "For mobile analytics on the go.",
    price: 950,
    icon: "tablet",
    features: ["M4 chip performance", "OLED display", "5G connectivity"],
  },
  {
    id: "macbook-pro-business",
    name: "MacBook Pro Business",
    tagline: "The standard for enterprise data teams.",
    price: 1999,
    popular: true,
    icon: "laptop",
    features: [
      "M3 Pro chip",
      "36GB unified memory",
      "1TB SSD storage",
      "Pre-configured Uniper environment",
    ],
  },
  {
    id: "macbook-max-enterprise",
    name: "MacBook Max Enterprise",
    tagline: "Maximum power for complex computations.",
    price: 2999.99,
    icon: "cpu",
    features: ["M3 Max chip", "128GB unified memory", "4TB SSD storage"],
  },
];

export function getPlanById(id: string | null | undefined): Plan | undefined {
  if (!id) return undefined;
  return PLANS.find((plan) => plan.id === id);
}
