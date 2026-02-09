"use client";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { scrollToSection } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";

type SectionId = "company" | "projects" | "services" | "contact";
type HeaderNavKey =
    | "nav_home"
    | "nav_our_projects"
    | "nav_our_services"
    | "nav_contact_us";

interface AnchorItem {
    id: SectionId;
    labelKey: HeaderNavKey;
}

const ANCHOR_ITEMS: AnchorItem[] = [
    { id: "company", labelKey: "nav_home" },
    { id: "projects", labelKey: "nav_our_projects" },
    { id: "services", labelKey: "nav_our_services" },
    { id: "contact", labelKey: "nav_contact_us" },
];

export function CustomDrawer() {
    const t = useTranslations("Header");

    return (
        <Drawer direction="left">
            <DrawerTrigger
                asChild
                className="p-2 bg-[#F7F5F2] rounded-xl shadow-md"
            >
                <HiOutlineMenuAlt2 size={45} color="#917355" className="p-2" />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="px-4 py-2 mt-4">
                    <DrawerTitle className="text-xl font-semibold text-[#917355]">
                        {t("menu_title")}
                    </DrawerTitle>
                    <DrawerClose asChild className="p-0">
                        <button
                            className="bg-transparent absolute top-5 right-5 p-0"
                            aria-label="Close"
                        >
                            <IoCloseSharp size={25} color="black" />
                        </button>
                    </DrawerClose>
                </DrawerHeader>
                <nav className="px-4 py-2">
                    <ul className="flex flex-col gap-4">
                        {ANCHOR_ITEMS.map(({ id, labelKey }) => (
                            <li key={id}>
                                <DrawerClose asChild>
                                    <button
                                        type="button"
                                        className="text-left text-base font-medium text-foreground hover:text-[#917355] transition-colors w-full py-1"
                                        onClick={() => {
                                            requestAnimationFrame(() => {
                                                requestAnimationFrame(() => {
                                                    scrollToSection(id);
                                                });
                                            });
                                        }}
                                    >
                                        {t(labelKey)}
                                    </button>
                                </DrawerClose>
                            </li>
                        ))}
                    </ul>
                </nav>
                <DrawerFooter>
                    <div className="flex gap-1 items-center justify-center text-sm">
                        <span className="tracking-wider">© 2026. All rights</span>
                        <Link href="/auth/login" className="cursor-default">reserved</Link>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
