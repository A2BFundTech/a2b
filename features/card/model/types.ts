import type { ProjectLocale } from "../validation/validation";
import type { FormData, CreateProjectBody } from "../validation/validation";

export type ProjectTranslation = FormData["translations"][ProjectLocale];
export type ProjectTranslations = FormData["translations"];

export type Project = {
  id: string;
  translations: ProjectTranslations;
  area: number;
  price: number;
  rentalYield: number;
  resaleYield: number;
  imageUrls: string[];
};

export type PendingImage = { file: File; previewUrl: string };

export type CreateProjectInput = Omit<CreateProjectBody, "imageUrls"> & {
  files: File[];
};
