import type { Order, OrderItem } from "@/lib/supabase/types";
import { createClient } from "@/lib/supabase/server";

async function getSetting(key: string): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("value").eq("key", key).single();
  return data?.value || null;
}

async function getBaseUrl(): Promise<string> {
  const dbValue = await getSetting("site_url");
  return dbValue || process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
}

async function getWhatsappLink(orderNumber?: string): Promise<string | null> {
  const dbValue = await getSetting("whatsapp_number");
  const number = dbValue || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) return null;
  const base = `https://wa.me/${number.replace(/[^0-9]/g, "")}`;
  const text = orderNumber
    ? encodeURIComponent(`Hi, I have a question about my order ${orderNumber}.`)
    : encodeURIComponent("Hi, I have a question about my order.");
  return `${base}?text=${text}`;
}

export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<{ ok: boolean; error?: string }> {
  const dbApiKey = await getSetting("email_api_key");
  const dbFrom = await getSetting("email_from");
  const apiKey = dbApiKey || process.env.RESEND_API_KEY;
  const from = dbFrom || process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.warn("Email not sent – email_api_key / email_from not configured in settings or env");
    return { ok: false, error: "Email not configured" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      text: params.text,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Resend error", body);
    return { ok: false, error: "Failed to send email" };
  }

  return { ok: true };
}

export async function buildVerifiedEmail(order: Order, items: OrderItem[]) {
  const baseUrl = await getBaseUrl();
  const whatsapp = await getWhatsappLink(order.order_number);
  const accessUrl = `${baseUrl}/thank-you?order=${order.id}`;
  const lines = items.map((i) => `- ${i.product_name} × ${i.quantity}`).join("\n");

  const subject = `Payment verified – access your purchase (Order ${order.order_number})`;
  const text = [
    `Hi ${order.guest_name || order.guest_email || "there"},`,
    "",
    `Your payment for order ${order.order_number} is verified ✅.`,
    "",
    "What you purchased:",
    lines,
    "",
    `Access your content here: ${accessUrl}`,
    "",
    whatsapp ? `If you need help, chat with us on WhatsApp: ${whatsapp}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <p>Hi ${order.guest_name || order.guest_email || "there"},</p>
    <p>Your payment for <strong>order ${order.order_number}</strong> is verified ✅.</p>
    <p><strong>What you purchased:</strong></p>
    <ul>
      ${items.map((i) => `<li>${i.product_name} × ${i.quantity}</li>`).join("")}
    </ul>
    <p><strong>Access your content:</strong><br/>
      <a href="${accessUrl}">${accessUrl}</a>
    </p>
    ${
      whatsapp
        ? `<p>If you need help, chat with us on WhatsApp:<br/><a href="${whatsapp}">${whatsapp}</a></p>`
        : ""
    }
  `;

  return { subject, text, html };
}

export async function buildPaymentReminderEmail(order: Order) {
  const baseUrl = await getBaseUrl();
  const whatsapp = await getWhatsappLink(order.order_number);
  const paymentUrl = `${baseUrl}/payment/${order.id}`;

  const subject = `Complete your payment (Order ${order.order_number})`;
  const text = [
    `Hi ${order.guest_name || order.guest_email || "there"},`,
    "",
    `We noticed your order ${order.order_number} is still pending payment.`,
    "",
    `Amount: ₹${Number(order.total_inr).toLocaleString()}`,
    "",
    `Complete your payment here: ${paymentUrl}`,
    "",
    whatsapp ? `If you have already paid or need help, message us on WhatsApp: ${whatsapp}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <p>Hi ${order.guest_name || order.guest_email || "there"},</p>
    <p>We noticed your order <strong>${order.order_number}</strong> is still pending payment.</p>
    <p><strong>Amount:</strong> ₹${Number(order.total_inr).toLocaleString()}</p>
    <p><strong>Complete your payment here:</strong><br/>
      <a href="${paymentUrl}">${paymentUrl}</a>
    </p>
    ${
      whatsapp
        ? `<p>If you have already paid or need help, message us on WhatsApp:<br/><a href="${whatsapp}">${whatsapp}</a></p>`
        : ""
    }
  `;

  return { subject, text, html };
}

