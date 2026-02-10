"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar";

import {
    House,
    UserStar,
    FolderPlus,
    Handshake,
    PencilLine,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

export default function AppSidebar() {
    const { open, setOpenMobile, openMobile } = useSidebar();

    const mobileCloseMenu = () => {
        if (openMobile) {
            setOpenMobile(false);
        }
    };
    return (
        <Sidebar collapsible="icon" className="font-sans">
            <SidebarHeader className="flex flex-row items-center justify-start gap-5 overflow-hidden">
                <div className="flex aspect-square size-8 items-center justify-center rounded-sm text-white bg-[#917355]">
                    <UserStar />
                </div>
                <AnimatePresence>
                    {open ? (
                        <motion.div
                            key="logo-open"
                            exit={{ opacity: 0 }}
                            className="font-semibold text-nowrap bg-transparent"
                        >
                            Admin Panel
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </SidebarHeader>
            <SidebarSeparator className="m-0" />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Managment</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href="/panel"
                                        onClick={mobileCloseMenu}
                                    >
                                        <House />
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href="/panel/projects-add"
                                        onClick={mobileCloseMenu}
                                    >
                                        <FolderPlus />
                                        <span>Add projects</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href="/panel/projects-edit"
                                        onClick={mobileCloseMenu}
                                    >
                                        <PencilLine />
                                        <span>Edit projects</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href="/panel/partners"
                                        onClick={mobileCloseMenu}
                                    >
                                        <Handshake />
                                        <span>Add partners</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
