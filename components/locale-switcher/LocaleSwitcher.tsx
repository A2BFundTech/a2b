"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { useTransition } from "react";

/** Коды локалей приложения (должны совпадать с i18n и папками messages) */
type Locale = "en" | "ru" | "uk" | "es";

const LOCALES: readonly Locale[] = ["en", "ru", "uk", "es"];

/** Подписи для переключателя по локали */
const LOCALE_LABELS: Record<Locale, string> = {
    en: "EN",
    ru: "RU",
    uk: "UA",
    es: "ES",
};
export function LocaleSwitcher() {
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const localeFromPath = pathname.match(/^\/([a-z]{2})/)?.[1] ?? "en";
    const displayLocale: Locale = LOCALES.includes(localeFromPath as Locale)
        ? (localeFromPath as Locale)
        : "en";

    const switchLocale = (newLocale: Locale) => {
        const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`);
        startTransition(() => {
            router.push(newPath);
            router.refresh();
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="min-w-12 gap-1 bg-[#F7F5F2] rounded-xl shadow-md border-[#917355]/20 hover:bg-[#F7F5F2]/90"
                >
                    <span>
                        {LOCALE_LABELS[displayLocale] ??
                            displayLocale.toUpperCase()}
                    </span>
                    <ChevronDownIcon className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {LOCALES.map((loc) => (
                    <DropdownMenuItem
                        key={loc}
                        onClick={() => switchLocale(loc)}
                        className={
                            loc === displayLocale
                                ? "bg-[#917355]/20 font-medium my-1"
                                : ""
                        }
                    >
                        {LOCALE_LABELS[loc]}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
