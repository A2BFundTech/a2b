import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";
import { z } from "zod";

const sendEmailSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(120, "Name too long"),
    email: z.string().trim().email("Invalid email").max(254, "Email too long"),
    phone: z
        .string()
        .trim()
        .min(1, "Phone is required")
        .max(40, "Phone too long"),
    message: z.string().trim().max(2000, "Message too long").optional(),
    locale: z.enum(["en", "ru", "uk", "es"]).default("en"),
});

const userEmailContent = {
    en: {
        subject: "We received your request — A2B Group",
        title: "Thank you for your request",
        greeting: "Hello!",
        body: "We received your request and will contact you shortly.",
        footer: "This is an automated message, please do not reply.",
        text: [
            "Hello!",
            "We received your request and will contact you shortly.",
            "",
            "This is an automated message, please do not reply.",
        ].join("\n"),
    },
    ru: {
        subject: "Мы получили вашу заявку — A2B Group",
        title: "Спасибо за вашу заявку",
        greeting: "Здравствуйте!",
        body: "Мы получили ваше обращение и свяжемся с вами в ближайшее время.",
        footer: "Это автоматическое письмо, пожалуйста, не отвечайте на него.",
        text: [
            "Здравствуйте!",
            "Мы получили ваше обращение и свяжемся с вами в ближайшее время.",
            "",
            "Это автоматическое письмо, пожалуйста, не отвечайте на него.",
        ].join("\n"),
    },
    uk: {
        subject: "Ми отримали вашу заявку — A2B Group",
        title: "Дякуємо за вашу заявку",
        greeting: "Вітаємо!",
        body: "Ми отримали ваше звернення та зв'яжемося з вами найближчим часом.",
        footer: "Це автоматичний лист, будь ласка, не відповідайте на нього.",
        text: [
            "Вітаємо!",
            "Ми отримали ваше звернення та зв'яжемося з вами найближчим часом.",
            "",
            "Це автоматичний лист, будь ласка, не відповідайте на нього.",
        ].join("\n"),
    },
    es: {
        subject: "Hemos recibido su solicitud — A2B Group",
        title: "Gracias por su solicitud",
        greeting: "Hola!",
        body: "Hemos recibido su solicitud y nos pondremos en contacto con usted en breve.",
        footer: "Este es un mensaje automático, por favor no responda.",
        text: [
            "Hola!",
            "Hemos recibido su solicitud y nos pondremos en contacto con usted en breve.",
            "",
            "Este es un mensaje automático, por favor no responda.",
        ].join("\n"),
    },
} as const;

function escapeHtml(input: string): string {
    return input
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function normalizeFrom(input: string): string {
    const trimmed = input.trim();
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
        return trimmed.slice(1, -1).trim();
    }
    return trimmed;
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
                { status: 400 },
            );
        }

        const { name, email, phone, message, locale } = parsed.data;

        const from = process.env.RESEND_FROM_EMAIL;
        const to = process.env.RESEND_TO_EMAIL;

        if (!from || !to) {
            return NextResponse.json(
                { success: false, error: "Email provider is not configured" },
                { status: 500 },
            );
        }

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone);
        const safeMessage = escapeHtml(message || "Нет сообщения");
        const normalizedFrom = normalizeFrom(from);

        const adminEmailPromise = resend.emails.send({
            from: normalizedFrom,
            to,
            replyTo: email,
            subject: "Новая заявка с сайта",
            html: `
        <div style="margin:0;padding:24px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:20px 24px;background:#917355;color:#ffffff;">
                <div style="font-size:18px;font-weight:700;">A2B Group</div>
                <div style="font-size:13px;opacity:.9;margin-top:4px;">Новая заявка на обратную связь</div>
              </td>
            </tr>
            <tr style="background:#f6f7fb;">
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

        const localizedUserEmail = userEmailContent[locale];
        const userEmailPromise = resend.emails.send({
            from: normalizedFrom,
            to: email,
            subject: localizedUserEmail.subject,
            html: `
                <div style="margin:0;padding:24px;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                    <tr>
                      <td style="padding:20px 24px;background:#917355;color:#ffffff;">
                        <div style="font-size:18px;font-weight:700;">A2B Group</div>
                        <div style="font-size:13px;opacity:.9;margin-top:4px;">
                          ${localizedUserEmail.title}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:20px 24px;">
        
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>

                            <td style="line-height:1.6;vertical-align:top;">
                              <p style="margin:0 0 12px;">${localizedUserEmail.greeting}</p>
                              <p style="margin:0 0 12px;">${localizedUserEmail.body}</p>
                            </td>

                            <td width="100" style="text-align:center;vertical-align:middle;">
                              <img
                                src="https://res.cloudinary.com/dergapnxj/image/upload/v1772602792/image_xjnipv.png"
                                alt="A2B Group"
                                width="80"
                                style="display:block;margin:0 auto;"
                              />
                            </td>

                          </tr>
                        </table>

                      </td>
                    </tr>

                    <tr>
                      <td style="padding:14px 24px;background:#f9fafb;color:#6b7280;font-size:12px;">
                        ${localizedUserEmail.footer}
                      </td>
                    </tr>

                  </table>
                </div>
            `,
            text: localizedUserEmail.text,
        });

        const [adminResult, userResult] = await Promise.allSettled([
            adminEmailPromise,
            userEmailPromise,
        ]);

        if (adminResult.status === "rejected") {
            console.error("Admin email rejected:", adminResult.reason);
            return NextResponse.json(
                { success: false, error: "Failed to send admin email" },
                { status: 502 },
            );
        }

        const { data, error } = adminResult.value;
        if (error) {
            console.error("Resend admin error:", error);
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 502 },
            );
        }

        if (userResult.status === "rejected") {
            console.warn("User auto-reply rejected:", userResult.reason);
        } else if (userResult.value.error) {
            console.warn(
                "Resend user auto-reply error:",
                userResult.value.error,
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Email sent successfully",
                id: data?.id ?? null,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("send-email route error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 },
        );
    }
}
