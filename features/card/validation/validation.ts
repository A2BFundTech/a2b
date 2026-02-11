import { z } from "zod";

export const PROJECT_LOCALES = ["en", "ru", "ua", "es"] as const;
export type ProjectLocale = (typeof PROJECT_LOCALES)[number];

export const translationSchema = z.object({
    name: z.string().trim().min(1, "name is required"),
    description: z.string().trim().min(1, "description is required"),
    location: z.string().trim().min(1, "location is required"),
    status: z.string().trim().min(1, "status is required"),
});

export const translationsSchema = z
    .object({
        en: translationSchema,
        ru: translationSchema,
        ua: translationSchema,
        es: translationSchema,
    })
    .strict();

export const projectBaseSchema = z
    .object({
        translations: translationsSchema,
        area: z.coerce.number().positive(),
        price: z.coerce.number().positive(),
        rentalYield: z.coerce.number().positive(),
        resaleYield: z.coerce.number().positive(),
    })
    .strict();

export const formSchema = projectBaseSchema.extend({
    imageUrls: z
        .array(z.string().trim().url("Invalid image url"))
        .min(1, "Upload at least 1 image")
        .max(5, "Maximum 5 images per project"),
});
export type FormData = z.input<typeof formSchema>;

export const createProjectBodySchema = formSchema;
export type CreateProjectBody = z.infer<typeof createProjectBodySchema>;