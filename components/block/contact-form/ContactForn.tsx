"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DotPattern } from "../../ui/dot-pattern";
import { sendContactEmail } from "@/features/email/api";
import { toast } from "sonner";

export type ContactFormValues = {
    name: string;
    email: string;
    phone: string;
    message?: string;
};

export async function submitContactStub(
    data: ContactFormValues
): Promise<{ ok: boolean }> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Contact form submitted (stub):", data);
    return { ok: true };
}

export function ContactForn() {
    const t = useTranslations("ContactForm");

    const schema = z.object({
        name: z.string().min(1, t("name_required")),
        email: z.email(t("email_invalid")).min(1, t("email_required")),
        phone: z.string().min(1, t("phone_required")),
        message: z.string().optional(),
    });

    type FormData = z.infer<typeof schema>;

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    });

    const mutation = useMutation({
        mutationFn: sendContactEmail,
        onSuccess: (result) => {
            if (result.ok) form.reset();
            toast.success(t("success_message"));
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const onSubmit = form.handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <section id="contact" className="py-10 md:py-20 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 hidden md:block my-3">
                <DotPattern className="text-[#917355]" />
            </div>
            <div className="container mx-auto px-4 relative ">
                <h2 className="font-heading text-4xl md:text-5xl font-semibold text-[#917355] text-center mb-4">
                    {t("title")}
                </h2>
                <p className="text-[#968c81] text-center text-sm md:text-base mb-10 max-w-xl mx-auto">
                    {t("subtitle")}
                </p>

                <div className="max-w-lg mx-auto">
                    <form
                        onSubmit={onSubmit}
                        className=" rounded-xl border border-[#91735556] bg-white shadow-sm p-6 md:p-8 space-y-5"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="contact-name" className="sr-only">
                                {t("name_placeholder")}
                            </Label>
                            <Input
                                id="contact-name"
                                placeholder={t("name_placeholder")}
                                className="border-[#e0e0e0] placeholder:text-[#a0a0a0]"
                                {...form.register("name")}
                            />
                            {form.formState.errors.name && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact-email" className="sr-only">
                                {t("email_placeholder")}
                            </Label>
                            <Input
                                id="contact-email"
                                type="email"
                                placeholder={t("email_placeholder")}
                                className="border-[#e0e0e0] placeholder:text-[#a0a0a0]"
                                {...form.register("email")}
                            />
                            {form.formState.errors.email && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact-phone" className="sr-only">
                                {t("phone_placeholder")}
                            </Label>
                            <Input
                                id="contact-phone"
                                type="tel"
                                placeholder={t("phone_placeholder")}
                                className="border-[#e0e0e0] placeholder:text-[#a0a0a0]"
                                {...form.register("phone")}
                            />
                            {form.formState.errors.phone && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.phone.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="contact-message"
                                className="sr-only"
                            >
                                {t("message_placeholder")}
                            </Label>
                            <Textarea
                                id="contact-message"
                                placeholder={t("message_placeholder")}
                                rows={4}
                                className="border-[#e0e0e0] placeholder:text-[#a0a0a0] min-h-[100px]"
                                {...form.register("message")}
                            />
                            {form.formState.errors.message && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.message.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="custom"
                            className="w-full h-11 rounded-md"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "..." : t("submit")}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
