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
    const email = String(body.email || "").trim();
    const company = String(body.company || "").trim();
    const service = String(body.service || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Momentum Website <onboarding@resend.dev>",
      to: [process.env.MOMENTUM_CONTACT_EMAIL],

      subject: `New Momentum enquiry — ${company || name}`,

      replyTo: email,

      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#171313">

          <div style="background:#9b2c2c;color:white;padding:24px;border-radius:14px 14px 0 0">
            <h1 style="margin:0">New Momentum Enquiry</h1>
            <p style="opacity:.8">Someone submitted the website contact form.</p>
          </div>

          <div style="padding:28px;border:1px solid #eadfcb;background:#fffdf9">

            <h3>Contact Details</h3>

            <p>
              <strong>Name</strong><br>
              ${name}
            </p>

            <p>
              <strong>Email</strong><br>
              ${email}
            </p>

            <p>
              <strong>Brand / Company</strong><br>
              ${company || "Not provided"}
            </p>

            <p>
              <strong>Interested In</strong><br>
              ${service || "Not selected"}
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
          error: error.message || "Resend rejected the email.",
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