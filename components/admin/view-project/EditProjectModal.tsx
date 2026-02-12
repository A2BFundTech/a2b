"use client";

import Image from "next/image";
import { Form } from "@/components/ui/form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEditProjectForm } from "@/features/card/hooks/useEditProjectForm";
import { PROJECT_LOCALES } from "@/features/card/validation/validation";
import type { Project } from "@/features/card/model/types";
import { TranslationLocaleFields } from "@/components/admin/project-form/TranslationLocaleFields";
import { ProjectNumbersFields } from "@/components/admin/project-form/ProjectNumbersFields";

type EditProjectModalProps = {
    onClose: () => void;
    project: Project;
};

export const EditProjectModal = ({
    onClose,
    project,
}: EditProjectModalProps) => {
    const {
        form,
        keptImageUrls,
        pendingImages,
        updateMutation,
        fileInputRef,
        imageUrls,
        onSubmit,
        removeExistingImage,
        removePendingImage,
        handleFileChange,
        maxImages: MAX_IMAGES,
    } = useEditProjectForm(project, onClose);

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background p-4 md:flex md:items-center md:justify-center md:bg-black/50 md:p-6">
            <div className="w-full max-w-lg mx-auto md:max-w-4xl md:max-h-[95vh] md:overflow-y-auto md:rounded-xl md:shadow-xl md:bg-background md:border md:border-[#91735520] p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Edit project</h2>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClose}
                        disabled={updateMutation.isPending}
                    >
                        Close
                    </Button>
                </div>

                <Form {...form}>
                    <form
                        className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-start"
                        onSubmit={onSubmit}
                    >
                        {PROJECT_LOCALES.map((locale) => (
                            <TranslationLocaleFields
                                key={locale}
                                locale={locale}
                                control={form.control}
                                isPending={updateMutation.isPending}
                            />
                        ))}

                        <ProjectNumbersFields
                            control={form.control}
                            isPending={updateMutation.isPending}
                        />

                        <div className="space-y-2 col-span-1 max-w-[500px]">
                            <FormField
                                control={form.control}
                                name="imageUrls"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Images</FormLabel>
                                        <p className="text-sm text-muted-foreground">
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
                                            disabled={updateMutation.isPending}
                                        />
                                        {imageUrls.length > 0 && (
                                            <ul className="flex flex-wrap gap-2">
                                                {keptImageUrls.map((url, index) => (
                                                    <li
                                                        key={`kept-${url}-${index}`}
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
                                                            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs hover:bg-destructive/90 transition-colors disabled:opacity-50"
                                                            onClick={() =>
                                                                removeExistingImage(index)
                                                            }
                                                            disabled={
                                                                updateMutation.isPending
                                                            }
                                                        >
                                                            ×
                                                        </button>
                                                    </li>
                                                ))}
                                                {pendingImages.map((img, index) => (
                                                    <li
                                                        key={`pending-${img.previewUrl}-${index}`}
                                                        className="relative"
                                                    >
                                                        <Image
                                                            src={img.previewUrl}
                                                            alt=""
                                                            width={64}
                                                            height={64}
                                                            className="h-20 w-20 rounded border object-cover"
                                                            unoptimized
                                                        />
                                                        <button
                                                            type="button"
                                                            aria-label="Remove image"
                                                            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs hover:bg-destructive/90 transition-colors disabled:opacity-50"
                                                            onClick={() =>
                                                                removePendingImage(index)
                                                            }
                                                            disabled={
                                                                updateMutation.isPending
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
                                                updateMutation.isPending ||
                                                imageUrls.length >= MAX_IMAGES
                                            }
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                        >
                                            {updateMutation.isPending
                                                ? "Saving..."
                                                : imageUrls.length >= MAX_IMAGES
                                                  ? `Max ${MAX_IMAGES} images`
                                                  : "Upload image(s)"}
                                        </Button>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={
                                    updateMutation.isPending ||
                                    !form.formState.isDirty
                                }
                            >
                                {updateMutation.isPending
                                    ? "Saving..."
                                    : "Update project"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};
