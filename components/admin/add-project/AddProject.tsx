"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/features/card/hooks/useCreateProject";
import { uploadImage } from "@/features/card/api/uploadImage";
import { toast } from "sonner";
import { formSchema } from "@/features/card/validation/validation";
import { FormData, PROJECT_LOCALES } from "@/features/card/model/types";

const LOCALE_LABELS: Record<(typeof PROJECT_LOCALES)[number], string> = {
    en: "English",
    ru: "Русский",
    ua: "Українська",
    es: "Español",
};

const defaultTranslations = Object.fromEntries(
    PROJECT_LOCALES.map((locale) => [locale, { name: "", description: "" }]),
) as FormData["translations"];

export const AddProject = () => {
    const createMutation = useCreateProject();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            translations: defaultTranslations,
        },
    });

    const onSubmit = form.handleSubmit((values) => {
        createMutation.mutate(
            {
                translations: values.translations,
                imageUrls,
            },
            {
                onSuccess: () => {
                    form.reset({ translations: defaultTranslations });
                    setImageUrls([]);
                    toast.success("Project saved");
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            },
        );
    });

    const removeImage = (index: number) => {
        setImageUrls((prev) => prev.filter((_, i) => i !== index));
    };

    const MAX_IMAGES = 5;

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return;

        const slotsLeft = MAX_IMAGES - imageUrls.length;
        if (slotsLeft <= 0) {
            e.target.value = "";
            return;
        }

        setUploading(true);
        try {
            const toUpload = Math.min(files.length, slotsLeft);
            for (let i = 0; i < toUpload; i++) {
                const url = await uploadImage(files[i]);
                setImageUrls((prev) =>
                    prev.length < MAX_IMAGES ? [...prev, url] : prev,
                );
            }
            toast.success("Image(s) uploaded");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    return (
        <section className="w-full space-y-4 rounded-lg border bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">Create project</h2>
            <Form {...form}>
                <form
                    className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center"
                    onSubmit={onSubmit}
                >
                    {PROJECT_LOCALES.map((locale) => (
                        <div
                            key={locale}
                            className="rounded-lg border border-[#91735520] p-4 space-y-4"
                        >
                            <h3 className="text-sm font-medium text-[#917355]">
                                {LOCALE_LABELS[locale]}
                            </h3>
                            <FormField
                                control={form.control}
                                name={`translations.${locale}.name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Project name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`translations.${locale}.description`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Short description"
                                                rows={3}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}

                    <div className="space-y-2 col-span-1 md:col-span-2 max-w-[500px] justify-center items-center">
                        <FormLabel>Images</FormLabel>
                        <p className="text-sm text-muted-foreground">
                            {imageUrls.length} of {MAX_IMAGES} images
                        </p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        {imageUrls.length > 0 && (
                            <ul className="flex flex-wrap gap-2">
                                {imageUrls.map((url, index) => (
                                    <li
                                        key={`${url}-${index}`}
                                        className="relative"
                                    >
                                        <Image
                                            src={url}
                                            alt=""
                                            width={64}
                                            height={64}
                                            className="h-16 w-16 rounded border object-cover"
                                            unoptimized
                                        />
                                        <button
                                            type="button"
                                            aria-label="Remove image"
                                            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs"
                                            onClick={() => removeImage(index)}
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            disabled={
                                uploading || imageUrls.length >= MAX_IMAGES
                            }
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {uploading
                                ? "Uploading…"
                                : imageUrls.length >= MAX_IMAGES
                                  ? "Max 5 images"
                                  : "Upload image(s)"}
                        </Button>
                    </div>
                    <div className="col-span-1 max-w-[500px] justify-center items-center">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={createMutation.isPending || uploading}
                        >
                            {createMutation.isPending
                                ? "Saving..."
                                : "Save project"}
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    );
};
