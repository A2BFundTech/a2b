"use client";

import type { Control, Path } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { EditFormData } from "@/features/card/validation/validation";

const FIELDS: { name: Path<EditFormData>; label: string }[] = [
    { name: "area", label: "Area" },
    { name: "price", label: "Price" },
    { name: "rentalYield", label: "Rental yield" },
    { name: "resaleYield", label: "Resale yield" },
];

type ProjectNumbersFieldsProps = {
    control: Control<EditFormData>;
    isPending?: boolean;
};

export function ProjectNumbersFields({
    control,
    isPending = false,
}: ProjectNumbersFieldsProps) {
    return (
        <div className="space-y-4 col-span-1 max-w-[500px]">
            <h3 className="text-sm font-medium">Numbers</h3>

            {FIELDS.map(({ name, label }) => (
                <FormField
                    key={name}
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="0"
                                    {...field}
                                    value={String(field.value ?? "")}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}
        </div>
    );
}
