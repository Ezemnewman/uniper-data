import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

const SUPPORT_EMAIL = "support@bisdoc.info";

interface PaymentUnavailableProps {
  planName: string;
}

export function PaymentUnavailable({ planName }: PaymentUnavailableProps) {
  return (
    <div className="max-w-xl mx-auto text-center bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
      <XCircle className="text-error mx-auto mb-md" size={48} aria-hidden="true" />
      <h2 className="text-title-md text-on-surface mb-sm">
        Payment Gateway
        <br />
        Is Temporarily Unavailable
      </h2>
      <p className="text-body-md text-on-surface-variant mb-lg">
        Your order for {planName} failed. Our payment gateway is currently experiencing technical
        difficulties. Our team is actively working to resolve this and expects to have service
        restored shortly.
      </p>

      <div className="border border-outline-variant rounded-xl p-md mb-lg">
        <p className="text-body-md text-on-surface">
          Please reach out to our support team to complete your payment using the email:
        </p>
        <a
          href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`Help completing my ${planName} order`)}`}
          className="text-body-md text-primary font-medium hover:underline"
        >
          {SUPPORT_EMAIL}
        </a>
      </div>

      <Button asChild>
        <a href="/">Back to home</a>
      </Button>
    </div>
  );
}
