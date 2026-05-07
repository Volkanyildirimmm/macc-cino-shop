import { NextResponse } from "next/server";

interface ContactPayload {
  company?: string;
  name?: string;
  email?: string;
  phone?: string;
  product?: string;
  message?: string;
}

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@macc-cino.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "noreply@macc-cino.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const company = body.company?.trim() ?? "";
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const product = body.product?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!company || !name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "message_too_long" }, { status: 400 });
  }

  const subject = `Yeni teklif talebi — ${company}`;
  const html = `
    <h2>Yeni İletişim Talebi</h2>
    <p><strong>Firma:</strong> ${escapeHtml(company)}</p>
    <p><strong>İsim:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(phone) || "—"}</p>
    <p><strong>İlgilendiği ürün:</strong> ${escapeHtml(product) || "—"}</p>
    <hr/>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  if (!RESEND_API_KEY) {
    console.log("[iletisim] RESEND_API_KEY yok — mesaj loglanıyor:", {
      company,
      name,
      email,
      phone,
      product,
      message,
    });
    return NextResponse.json({ ok: true, dev: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[iletisim] Resend error", res.status, detail);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
