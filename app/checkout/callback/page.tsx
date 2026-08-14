import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

interface VerifyResult {
  success: boolean;
  message: string;
}

async function verifyTransaction(reference: string): Promise<VerifyResult> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return { success: false, message: "Payment verification is not configured on this server." };
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: { Authorization: `Bearer ${secretKey}` },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      return { success: false, message: data.message ?? "We couldn't verify this payment." };
    }

    const isSuccessful = data.data?.status === "success";
    return {
      success: isSuccessful,
      message: isSuccessful
        ? "Your payment has been confirmed. A receipt is on its way to your inbox."
        : "This payment was not completed. No charge was made.",
    };
  } catch {
    return { success: false, message: "We couldn't reach Paystack to verify this payment." };
  }
}

interface CallbackPageProps {
  searchParams: { reference?: string; trxref?: string };
}

export default async function PaystackCallbackPage({ searchParams }: CallbackPageProps) {
  const reference = searchParams.reference ?? searchParams.trxref;

  const result: VerifyResult = reference
    ? await verifyTransaction(reference)
    : { success: false, message: "No payment reference was provided." };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center px-margin-mobile py-xl">
        <div className="max-w-xl w-full text-center bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          {result.success ? (
            <CheckCircle2 className="text-success mx-auto mb-md" size={48} aria-hidden="true" />
          ) : (
            <XCircle className="text-error mx-auto mb-md" size={48} aria-hidden="true" />
          )}
          <h1 className="text-title-md text-on-surface mb-sm">
            {result.success ? "Payment successful" : "Payment not completed"}
          </h1>
          <p className="text-body-md text-on-surface-variant mb-lg">{result.message}</p>
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
