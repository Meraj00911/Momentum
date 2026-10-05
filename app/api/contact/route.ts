import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");

      return NextResponse.json(
        { error: "RESEND_API_KEY is missing." },
        { status: 500 }
      );
    }

    if (!process.env.MOMENTUM_CONTACT_EMAIL) {
      console.error("Missing MOMENTUM_CONTACT_EMAIL");

      return NextResponse.json(
        { error: "MOMENTUM_CONTACT_EMAIL is missing." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const name = String(body.name || "").trim();
    const brand = String(body.brand || "").trim();
    const budget = String(body.budget || "").trim();
    const message = String(body.message || "").trim();

    const services = Array.isArray(body.services)
      ? body.services.map((item: unknown) => String(item))
      : [];

    if (!name || !brand || !budget || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
from: "Momentum Website <hello@momentumagency.in>",

      to: [process.env.MOMENTUM_CONTACT_EMAIL],

      subject: `New Momentum enquiry — ${brand}`,

      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#171313">

          <div style="background:#9b2c2c;color:white;padding:24px;border-radius:14px 14px 0 0">
            <h1 style="margin:0">New Momentum Enquiry</h1>
            <p style="opacity:.8">
              Someone submitted the Momentum website contact form.
            </p>
          </div>

          <div style="padding:28px;border:1px solid #eadfcb;background:#fffdf9">

            <h3>Contact Details</h3>

            <p>
              <strong>Name</strong><br>
              ${name}
            </p>

            <p>
              <strong>Brand</strong><br>
              ${brand}
            </p>

            <p>
              <strong>Monthly Ad Budget</strong><br>
              ${budget}
            </p>

            <p>
              <strong>What They Need</strong><br>
              ${
                services.length
                  ? services.join(", ")
                  : "Not selected"
              }
            </p>

            <hr style="border:0;border-top:1px solid #eadfcb;margin:25px 0">

            <h3>Message</h3>

            <p style="white-space:pre-wrap;line-height:1.7;color:#665954">
              ${message}
            </p>

          </div>

        </div>
      `,
    });

    if (error) {
      console.error("RESEND ERROR:", error);

      return NextResponse.json(
        {
          error:
            error.message || "Resend rejected the email.",
        },
        { status: 500 }
      );
    }

    console.log("EMAIL SENT:", data);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}