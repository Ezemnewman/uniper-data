import { NextRequest, NextResponse } from "next/server";

// Read at request time (not module load time) so a missing key produces a
// clean 500 response instead of crashing the route during build.
function getSecretKey() {
  return process.env.PAYSTACK_SECRET_KEY;
}

interface InitRequestBody {
  email?: string;
  amount?: number; // smallest currency unit (e.g. kobo for NGN)
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

  const { email, amount, planId, planName } = body;

  if (!email || typeof amount !== "number" || amount <= 0) {
    return NextResponse.json({ error: "A valid email and amount are required." }, { status: 400 });
  }

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
        amount,
        currency: "NGN",
        callback_url: `${origin}/checkout/callback`,
        metadata: { planId, planName },
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
