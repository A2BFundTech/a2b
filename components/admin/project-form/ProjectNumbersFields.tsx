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

const FIELDS: {
    name: Path<EditFormData>;
    label: string;
    placeholder: string;
    inputType?: "text" | "url";
}[] = [
    { name: "area", label: "Area", placeholder: "0" },
    { name: "price", label: "Price", placeholder: "0" },
    { name: "rentalYield", label: "Rental yield", placeholder: "0" },
    { name: "resaleYield", label: "Resale yield", placeholder: "0" },
    {
        name: "quantityOfApartments",
        label: "Quantity of apartments",
        placeholder: "0",
    },
    {
        name: "bookingLink",
        label: "Booking link",
        placeholder: "https://www.booking.com/...",
        inputType: "url",
    },
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

            {FIELDS.map(({ name, label, placeholder, inputType = "text" }) => (
                <FormField
                    key={name}
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                                <Input
                                    type={inputType}
                                    placeholder={placeholder}
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
