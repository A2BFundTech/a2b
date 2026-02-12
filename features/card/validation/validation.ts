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

/** All fields optional for PATCH / partial update (no required min length) */
export const translationUpdateSchema = z.object({
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
    location: z.string().trim().optional(),
    status: z.string().trim().optional(),
});

export const translationsUpdateSchema = z
    .object({
        en: translationUpdateSchema.optional(),
        ru: translationUpdateSchema.optional(),
        ua: translationUpdateSchema.optional(),
        es: translationUpdateSchema.optional(),
    })
    .strict();

export const updateProjectBodySchema = z
    .object({
        translations: translationsUpdateSchema.optional(),
        area: z.coerce.number().positive().optional(),
        price: z.coerce.number().positive().optional(),
        rentalYield: z.coerce.number().positive().optional(),
        resaleYield: z.coerce.number().positive().optional(),
        imageUrls: z
            .array(z.string().trim().url())
            .max(5, "Maximum 5 images per project")
            .optional(),
    })
    .strict();

export type UpdateProjectBody = z.infer<typeof updateProjectBodySchema>;

/** Form schema for edit modal – all fields optional */
export const updateFormSchema = z.object({
    translations: z
        .object({
            en: translationUpdateSchema.optional(),
            ru: translationUpdateSchema.optional(),
            ua: translationUpdateSchema.optional(),
            es: translationUpdateSchema.optional(),
        })
        .optional(),
    area: z.coerce.number().nonnegative().optional(),
    price: z.coerce.number().nonnegative().optional(),
    rentalYield: z.coerce.number().nonnegative().optional(),
    resaleYield: z.coerce.number().nonnegative().optional(),
    imageUrls: z.array(z.string()).max(5).optional(),
});
export type UpdateFormData = z.input<typeof updateFormSchema>;

/** Translation schema for edit form – required fields, Russian error messages */
const editTranslationSchema = z.object({
    name: z.string().trim().min(1, "Введите название"),
    description: z.string().trim().min(1, "Введите описание"),
    location: z.string().trim().min(1, "Введите локацию"),
    status: z.string().trim().min(1, "Введите статус"),
});

const editTranslationsSchema = z
    .object({
        en: editTranslationSchema,
        ru: editTranslationSchema,
        ua: editTranslationSchema,
        es: editTranslationSchema,
    })
    .strict();

/** Edit form: same required rules as create, user sees Zod errors under fields. imageUrls accepts any string (blob URLs for previews). */
export const editFormSchema = z
    .object({
        translations: editTranslationsSchema,
        area: z.coerce.number().positive("Введите площадь"),
        price: z.coerce.number().positive("Введите цену"),
        rentalYield: z.coerce.number().positive("Введите rental yield"),
        resaleYield: z.coerce.number().positive("Введите resale yield"),
        imageUrls: z
            .array(z.string().min(1))
            .min(1, "Добавьте хотя бы одно изображение")
            .max(5, "Максимум 5 изображений"),
    })
    .strict();
export type EditFormData = z.infer<typeof editFormSchema>;