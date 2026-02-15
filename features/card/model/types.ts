import type { ProjectLocale } from "../validation/validation";
import type {
    FormData,
    CreateProjectBody,
    UpdateProjectBody,
} from "../validation/validation";

export type ProjectTranslation = FormData["translations"][ProjectLocale];
export type ProjectTranslations = FormData["translations"];

export type Project = {
  id: string;
  translations: ProjectTranslations;
  area: string;
  price: string;
  rentalYield: string;
  resaleYield: string;
  imageUrls: string[];
};

export type PendingImage = { file: File; previewUrl: string };

export type CreateProjectInput = Omit<CreateProjectBody, "imageUrls"> & {
  files: File[];
};

export type UpdateProjectInput = { id: string } & UpdateProjectBody & {
  files?: File[];
};
