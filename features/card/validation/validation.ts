import z from "zod";
import { PROJECT_LOCALES } from "../model/types";

const localeTranslationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
});

const translationsSchema = z.object(
    Object.fromEntries(
        PROJECT_LOCALES.map((locale) => [
            locale,
            localeTranslationSchema,
        ]),
    ) as Record<(typeof PROJECT_LOCALES)[number], typeof localeTranslationSchema>,
);

export const formSchema = z.object({
    translations: translationsSchema,
});
