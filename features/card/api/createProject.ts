import { auth } from "@/lib/firebase";
import { CreateProjectInput, Project } from "../model/types";

export async function createProject(input: CreateProjectInput): Promise<Project> {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const idToken = await user.getIdToken();

  const formData = new FormData();
  formData.set(
    "payload",
    JSON.stringify({
      translations: input.translations,
      area: input.area,
      price: input.price,
      rentalYield: input.rentalYield,
      resaleYield: input.resaleYield,
    }),
  );

  for (const file of input.files) {
    formData.append("images", file);
  }

  const res = await fetch("/api/projects/add", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    body: formData,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // если сервер вернул issues (zod), можно отдать их наверх
    const message =
      typeof data?.message === "string" ? data.message : "Failed to create project";
    const error = new Error(message) as Error & { issues?: unknown };
    if (data?.issues) error.issues = data.issues;
    throw error;
  }

  return data as Project;
}
