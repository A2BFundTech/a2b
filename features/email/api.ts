export type SendEmailPayload = {
    name: string;
    email: string;
    phone: string;
    message?: string;
    locale: "en" | "ru" | "uk" | "es";
};

export type SendEmailResult =
    | { ok: true }
    | { ok: false; error: string };

export async function sendContactEmail(
    data: SendEmailPayload
): Promise<SendEmailResult> {
    try {
        const res = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.message ?? "",
                locale: data.locale,
            }),
        });

        const json = await res.json().catch(() => ({}));

        if (!res.ok) {
            return {
                ok: false,
                error: typeof json.error === "string" ? json.error : "Ошибка отправки",
            };
        }

        return { ok: true };
    } catch (e) {
        console.error(e);
        return { ok: false, error: "Ошибка сети" };
    }
}