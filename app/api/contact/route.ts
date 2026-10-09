import { NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_REQUEST_BYTES = 20_000;

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function readTextField(
  body: Record<string, unknown>,
  key: string,
  maximumLength: number,
) {
  const value = body[key];
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maximumLength) return null;
  return trimmed;
}

export async function POST(request: Request) {
  const originHeader = request.headers.get("origin");
  let requestOrigin: string;

  try {
    requestOrigin = new URL(request.url).origin;
    if (!originHeader || new URL(originHeader).origin !== requestOrigin) {
      return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return NextResponse.json({ error: "Expected JSON request." }, { status: 415 });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "Message is too large." }, { status: 413 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.MOMENTUM_CONTACT_EMAIL) {
    console.error("Contact service is not configured.");
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ error: "Message is too large." }, { status: 413 });
    }

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    if (
      !parsedBody ||
      typeof parsedBody !== "object" ||
      Array.isArray(parsedBody)
    ) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const body = parsedBody as Record<string, unknown>;
    const name = readTextField(body, "name", 120);
    const brand = readTextField(body, "brand", 120);
    const budget = readTextField(body, "budget", 80);
    const message = readTextField(body, "message", 4_000);
    const services = Array.isArray(body.services)
      ? body.services
          .filter((item): item is string => typeof item === "string")
          .slice(0, 12)
          .map((item) => item.trim().slice(0, 80))
          .filter(Boolean)
      : [];

    if (!name || !brand || !budget || !message) {
      return NextResponse.json(
        { error: "Please check the required fields and try again." },
        { status: 400 },
      );
    }

    const safeName = escapeHtml(name);
    const safeBrand = escapeHtml(brand);
    const safeBudget = escapeHtml(budget);
    const safeServices = escapeHtml(services.length ? services.join(", ") : "Not selected");
    const safeMessage = escapeHtml(message);
    const subjectBrand = brand.replace(/[\r\n]+/g, " ").slice(0, 120);

    const { data, error } = await resend.emails.send({
      from: "Momentum Website <hello@momentumagency.in>",
      to: [process.env.MOMENTUM_CONTACT_EMAIL],
      subject: `New Momentum enquiry — ${subjectBrand}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#171313">
          <div style="background:#9b2c2c;color:white;padding:24px;border-radius:14px 14px 0 0">
            <h1 style="margin:0">New Momentum Enquiry</h1>
            <p style="opacity:.8">Someone submitted the Momentum website contact form.</p>
          </div>
          <div style="padding:28px;border:1px solid #eadfcb;background:#fffdf9">
            <h3>Contact details</h3>
            <p><strong>Name</strong><br>${safeName}</p>
            <p><strong>Brand</strong><br>${safeBrand}</p>
            <p><strong>Monthly ad budget</strong><br>${safeBudget}</p>
            <p><strong>What they need</strong><br>${safeServices}</p>
            <hr style="border:0;border-top:1px solid #eadfcb;margin:25px 0">
            <h3>Message</h3>
            <p style="white-space:pre-wrap;line-height:1.7;color:#665954">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Contact email delivery failed.", error);
      return NextResponse.json(
        { error: "We could not send your message. Please try again later." },
        { status: 502 },
      );
    }

    console.info("Momentum contact email sent.", { id: data?.id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form request failed.", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
