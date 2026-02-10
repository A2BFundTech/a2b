"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useProjects } from "@/features/card/hooks/useProjects";
import { useCreateProject } from "@/features/card/hooks/useCreateProject";
import { uploadImage } from "@/features/card/api/uploadImage";
import { ProjectCard } from "@/components/our-projects/ProjectCard";
import type { Project } from "@/components/our-projects/types";
import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function ProjectsPage() {
    const { data: projects = [], isLoading } = useProjects();
    const createMutation = useCreateProject();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = form.handleSubmit((values) => {
        createMutation.mutate(
            {
                name: values.name,
                description: values.description,
                imageUrls,
            },
            {
                onSuccess: () => {
                    form.reset();
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
        <div className="flex w-full h-full flex-col gap-6 p-4 justify-center items-center overflow-auto">
            <section className="w-full max-w-4xl space-y-4 rounded-lg border bg-white p-4 shadow-sm">
                <h2 className="text-lg font-semibold">Create project</h2>
                <Form {...form}>
                    <form className="space-y-4" onSubmit={onSubmit}>
                        <FormField
                            control={form.control}
                            name="name"
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
                            name="description"
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

                        <div className="space-y-2">
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
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                disabled={uploading || imageUrls.length >= MAX_IMAGES}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {uploading
                                    ? "Uploading…"
                                    : imageUrls.length >= MAX_IMAGES
                                      ? "Max 5 images"
                                      : "Upload image(s)"}
                            </Button>
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
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={createMutation.isPending}
                        >
                            {createMutation.isPending
                                ? "Saving..."
                                : "Save project"}
                        </Button>
                    </form>
                </Form>
            </section>

            <section className=" w-full max-w-4xl overflow-auto rounded-lg border bg-white p-4 shadow-sm">
                <h2 className="mb-3 text-lg font-semibold">Projects</h2>
                {isLoading ? (
                    <p className="text-sm text-muted-foreground">
                        Loading projects...
                    </p>
                ) : projects.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No projects yet.
                    </p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {projects.map((project: Project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                className="h-[260px] w-full max-w-none"
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
