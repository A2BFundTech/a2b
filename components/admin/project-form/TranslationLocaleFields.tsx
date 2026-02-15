"use client";

import type { Control } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    type EditFormData,
    type ProjectLocale,
} from "@/features/card/validation/validation";

const LOCALE_LABELS: Record<ProjectLocale, string> = {
    en: "English",
    ru: "Русский",
    uk: "Українська",
    es: "Español",
};

type TranslationLocaleFieldsProps = {
    locale: ProjectLocale;
    control: Control<EditFormData>;
    isPending?: boolean;
};

export function TranslationLocaleFields({
    locale,
    control,
    isPending = false,
}: TranslationLocaleFieldsProps) {
    return (
        <div className="rounded-lg border border-[#91735520] p-4 space-y-4">
            <h3 className="text-sm font-medium text-[#917355]">
                {LOCALE_LABELS[locale]}
            </h3>

            <FormField
                control={control}
                name={`translations.${locale}.name`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Project name"
                                {...field}
                                value={field.value ?? ""}
                                disabled={isPending}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name={`translations.${locale}.description`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Short description"
                                rows={3}
                                {...field}
                                value={field.value ?? ""}
                                disabled={isPending}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name={`translations.${locale}.location`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Location"
                                {...field}
                                value={field.value ?? ""}
                                disabled={isPending}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name={`translations.${locale}.status`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Status"
                                {...field}
                                value={field.value ?? ""}
                                disabled={isPending}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
