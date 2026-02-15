"use client";

import { useState, useRef, useEffect } from "react";
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
import { toast } from "sonner";
import {
    FormData,
    formSchema,
    PROJECT_LOCALES,
} from "@/features/card/validation/validation";
import { PendingImage } from "@/features/card/model/types";

const LOCALE_LABELS: Record<(typeof PROJECT_LOCALES)[number], string> = {
    en: "English",
    ru: "Русский",
    uk: "Українська",
    es: "Español",
};

const defaultTranslations = Object.fromEntries(
    PROJECT_LOCALES.map((locale) => [
        locale,
        { name: "", description: "", location: "", status: "" },
    ]),
) as FormData["translations"];

const DEFAULT_VALUES: FormData = {
    translations: defaultTranslations,
    area: "",
    price: "",
    rentalYield: "",
    resaleYield: "",
    imageUrls: [],
};

export const AddProject = () => {
    const createMutation = useCreateProject();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
    const pendingImagesRef = useRef<PendingImage[]>([]);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: DEFAULT_VALUES,
    });

    useEffect(() => {
        pendingImagesRef.current = pendingImages;
    }, [pendingImages]);

    useEffect(() => {
        form.setValue(
            "imageUrls",
            pendingImages.map((x) => x.previewUrl),
            {
                shouldDirty: pendingImages.length > 0,
                shouldTouch: pendingImages.length > 0,
                shouldValidate: form.formState.isSubmitted,
            },
        );
    }, [pendingImages, form]);

    const imageUrls = form.watch("imageUrls");

    const MAX_IMAGES = 5;

    const onSubmit = form.handleSubmit((values) => {
        const payload = {
            translations: values.translations,
            area: values.area,
            price: values.price,
            rentalYield: values.rentalYield,
            resaleYield: values.resaleYield,
        };
        const files = pendingImages.map((img) => img.file);

        createMutation.mutate(
            { ...payload, files },
            {
                onSuccess: () => {
                    pendingImages.forEach((img) =>
                        URL.revokeObjectURL(img.previewUrl),
                    );
                    setPendingImages([]);
                    form.reset(DEFAULT_VALUES);
                    toast.success("Project saved");
                },
                onError: (error) => toast.error(error.message),
            },
        );
    });

    const removeImage = (index: number) => {
        setPendingImages((prev) => {
            const item = prev[index];
            if (item) URL.revokeObjectURL(item.previewUrl);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return;

        const slotsLeft = MAX_IMAGES - pendingImages.length;
        if (slotsLeft <= 0) {
            e.target.value = "";
            return;
        }

        const picked = Array.from(files).slice(0, slotsLeft);
        const next = picked.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));

        setPendingImages((prev) => [...prev, ...next]);
        e.target.value = "";
    };

    useEffect(() => {
        return () => {
            pendingImagesRef.current.forEach((img) =>
                URL.revokeObjectURL(img.previewUrl),
            );
        };
    }, []);

    return (
        <section className="w-full space-y-4 md:rounded-lg border bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">Create project</h2>

            <Form {...form}>
                <form
                    className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-start"
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

                            <FormField
                                control={form.control}
                                name={`translations.${locale}.location`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Location"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`translations.${locale}.status`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Status"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}

                    {/* Numbers */}
                    <div className="space-y-4 col-span-1  max-w-[500px]">
                        <h3 className="text-sm font-medium">Numbers</h3>

                        <FormField
                            control={form.control}
                            name="area"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Area</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="0"
                                            {...field}
                                            value={String(field.value ?? "")}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="0"
                                            {...field}
                                            value={String(field.value ?? "")}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="rentalYield"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rental yield</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="0"
                                            {...field}
                                            value={String(field.value ?? "")}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="resaleYield"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Resale yield</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="0"
                                            {...field}
                                            value={String(field.value ?? "")}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Images */}
                    <div className="space-y-2 col-span-1  max-w-[500px]">
                        <FormField
                            control={form.control}
                            name="imageUrls"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Images</FormLabel>
                                    <p>
                                        {imageUrls.length} of {MAX_IMAGES}{" "}
                                        images
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
                                                        className="h-20 w-20 rounded border object-cover"
                                                        unoptimized
                                                    />
                                                    <button
                                                        type="button"
                                                        aria-label="Remove image"
                                                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs"
                                                        onClick={() =>
                                                            removeImage(index)
                                                        }
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
                                            createMutation.isPending ||
                                            imageUrls.length >= MAX_IMAGES
                                        }
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                    >
                                        {createMutation.isPending
                                            ? "Saving..."
                                            : imageUrls.length >= MAX_IMAGES
                                              ? "Max 5 images"
                                              : "Upload image(s)"}
                                    </Button>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Submit */}
                    <div className="col-span-1 md:col-span-2">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={createMutation.isPending}
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
