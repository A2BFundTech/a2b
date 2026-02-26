import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";
import { z } from "zod";

const sendEmailSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120, "Name too long"),
  email: z.string().trim().email("Invalid email").max(254, "Email too long"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .max(40, "Phone too long"),
  message: z.string().trim().max(2000, "Message too long").optional(),
});

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: Request) {
  try {
    const json: unknown = await req.json();
    const parsed = sendEmailSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          fields: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = parsed.data;

    const from = process.env.RESEND_FROM_EMAIL;
    const to = process.env.RESEND_TO_EMAIL;

    if (!from || !to) {
      return NextResponse.json(
        { success: false, error: "Email provider is not configured" },
        { status: 500 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message || "Нет сообщения");

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: "Новая заявка с сайта",
      html: `
        <div style="margin:0;padding:24px;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:20px 24px;background:#111827;color:#ffffff;">
                <div style="font-size:18px;font-weight:700;">A2B Group</div>
                <div style="font-size:13px;opacity:.9;margin-top:4px;">Новая заявка на обратную связь</div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:140px;color:#6b7280;">Имя</td>
                    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#6b7280;">Email</td>
                    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                      <a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#6b7280;">Телефон</td>
                    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">${safePhone}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0 6px;color:#6b7280;vertical-align:top;">Сообщение</td>
                    <td style="padding:12px 0 6px;white-space:pre-wrap;line-height:1.5;">${safeMessage}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 24px;background:#f9fafb;color:#6b7280;font-size:12px;">
                Отправлено с сайта a2b-group.com
              </td>
            </tr>
          </table>
        </div>
      `,
      text: [
        "Новая заявка на обратную связь",
        `Имя: ${name}`,
        `Email: ${email}`,
        `Телефон: ${phone}`,
        `Сообщение: ${message || "Нет сообщения"}`,
      ].join("\n"),
    });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("send-email route error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}