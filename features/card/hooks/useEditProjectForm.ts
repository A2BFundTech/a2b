"use client";

import { useState, useRef, useEffect } from "react";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
    editFormSchema,
    EditFormData,
} from "@/features/card/validation/validation";
import type { UpdateProjectInput } from "@/features/card/model/types";
import type { PendingImage, Project } from "@/features/card/model/types";
import { useUpdateProject } from "./useUpdateProject";

const MAX_IMAGES = 5;

function projectToFormData(project: Project): EditFormData {
    return {
        translations: project.translations,
        area: project.area,
        price: project.price,
        rentalYield: project.rentalYield,
        resaleYield: project.resaleYield,
        imageUrls: project.imageUrls,
        quantityOfApartments: project.quantityOfApartments,
        bookingLink: project.bookingLink ?? "",
    };
}

export function useEditProjectForm(project: Project, onClose: () => void) {
    const updateMutation = useUpdateProject();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [keptImageUrls, setKeptImageUrls] = useState<string[]>(
        project.imageUrls ?? [],
    );
    const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
    const pendingImagesRef = useRef<PendingImage[]>([]);

    const form = useForm<EditFormData>({
        resolver: zodResolver(editFormSchema) as Resolver<EditFormData>,
        mode: "onChange",
        defaultValues: projectToFormData(project),
    });

    useEffect(() => {
        pendingImagesRef.current = pendingImages;
    }, [pendingImages]);

    useEffect(() => {
        form.setValue(
            "imageUrls",
            [...keptImageUrls, ...pendingImages.map((x) => x.previewUrl)],
            { shouldDirty: true, shouldTouch: true },
        );
    }, [keptImageUrls, pendingImages, form]);

    const imageUrls = form.watch("imageUrls") ?? [];

    const onSubmit = form.handleSubmit((values) => {
        const payload: UpdateProjectInput = {
            id: project.id,
            translations: values.translations,
            area: values.area,
            price: values.price,
            rentalYield: values.rentalYield,
            resaleYield: values.resaleYield,
            imageUrls: keptImageUrls,
            quantityOfApartments: values.quantityOfApartments,
            bookingLink: values.bookingLink,
        };
        const files = pendingImages.map((img) => img.file);
        if (files.length > 0) payload.files = files;

        updateMutation.mutate(payload, {
            onSuccess: () => {
                pendingImages.forEach((img) =>
                    URL.revokeObjectURL(img.previewUrl),
                );
                setPendingImages([]);
                toast.success("Project updated");
                onClose();
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    });

    const removeExistingImage = (index: number) => {
        setKeptImageUrls((prev) => prev.filter((_, i) => i !== index));
    };

    const removePendingImage = (index: number) => {
        setPendingImages((prev) => {
            const item = prev[index];
            if (item) URL.revokeObjectURL(item.previewUrl);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return;

        const currentTotal = keptImageUrls.length + pendingImages.length;
        const slotsLeft = MAX_IMAGES - currentTotal;

        if (slotsLeft <= 0) {
            toast.error(`Maximum ${MAX_IMAGES} images allowed`);
            e.target.value = "";
            return;
        }

        const picked = Array.from(files).slice(0, slotsLeft);

        const invalidFiles = picked.filter(
            (file) =>
                !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
                    file.type,
                ) || file.size > 10 * 1024 * 1024,
        );

        if (invalidFiles.length > 0) {
            toast.error(
                "Some files are invalid. Only JPEG, PNG, WEBP, GIF under 10MB are allowed.",
            );
            e.target.value = "";
            return;
        }

        const next = picked.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));

        setPendingImages((prev) => [...prev, ...next]);
        e.target.value = "";

        if (picked.length < files.length) {
            toast.info(
                `Only ${picked.length} images added (max ${MAX_IMAGES} total)`,
            );
        }
    };

    useEffect(() => {
        return () => {
            pendingImagesRef.current.forEach((img) =>
                URL.revokeObjectURL(img.previewUrl),
            );
        };
    }, []);

    return {
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
    };
}
