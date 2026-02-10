import z from "zod";
import { formSchema } from "../validation/validation";

export type FormData = z.infer<typeof formSchema>;


export const PROJECT_LOCALES = ["en", "ru", "ua", "es"] as const;
export type ProjectLocale = (typeof PROJECT_LOCALES)[number];

export type ProjectTranslation = {
    name: string;
    description: string;
};

export type ProjectTranslations = Record<ProjectLocale, ProjectTranslation>;

export type Project = {
    id: string;
    translations: ProjectTranslations;
    imageUrls: string[];
};

const FALLBACK_LOCALE: ProjectLocale = "en";

export function getProjectName(project: Project, locale: string): string {
    const loc = (PROJECT_LOCALES.includes(locale as ProjectLocale)
        ? locale
        : FALLBACK_LOCALE) as ProjectLocale;
    return project.translations[loc]?.name ?? project.translations.en.name ?? "";
}

export function getProjectDescription(
    project: Project,
    locale: string,
): string {
    const loc = (PROJECT_LOCALES.includes(locale as ProjectLocale)
        ? locale
        : FALLBACK_LOCALE) as ProjectLocale;
    return project.translations[loc]?.description ?? project.translations.en.description ?? "";
}
