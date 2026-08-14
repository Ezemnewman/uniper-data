import { NextRequest, NextResponse } from "next/server";

import { convertUsdToNgn } from "@/lib/currency";

// Read at request time (not module load time) so a missing key produces a
// clean 500 response instead of crashing the route during build.
function getSecretKey() {
  return process.env.PAYSTACK_SECRET_KEY;
}

interface InitRequestBody {
  email?: string;
  amountUsd?: number; // order total in USD, before currency conversion
  planId?: string;
  planName?: string;
}

export async function POST(request: NextRequest) {
  const secretKey = getSecretKey();

  if (!secretKey) {
    return NextResponse.json(
      { error: "Paystack is not configured on this server. Add PAYSTACK_SECRET_KEY to your environment." },
      { status: 500 }
    );
  }

  let body: InitRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, amountUsd, planId, planName } = body;

  if (!email || typeof amountUsd !== "number" || amountUsd <= 0) {
    return NextResponse.json({ error: "A valid email and amount are required." }, { status: 400 });
  }

  const amountNgn = convertUsdToNgn(amountUsd);
  // Paystack expects the amount in the smallest currency unit (kobo for NGN).
  const amountKobo = Math.round(amountNgn * 100);

  const origin = request.nextUrl.origin;

  try {
    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountKobo,
        // Paystack settles in the currency tied to your account (commonly
        // NGN for Nigerian accounts). Change this if your account is set
        // up for a different settlement currency — and update the
        // USD_TO_NGN_RATE conversion above accordingly.
        currency: "NGN",
        callback_url: `${origin}/checkout/callback`,
        metadata: { planId, planName, amountUsd },
      }),
    });

    const data = await paystackResponse.json();

    if (!paystackResponse.ok || !data.status) {
      return NextResponse.json(
        { error: data.message ?? "Failed to initialize the Paystack transaction." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url as string,
      reference: data.data.reference as string,
    });
  } catch {
    return NextResponse.json({ error: "Could not reach Paystack. Please try again." }, { status: 502 });
  }
}
