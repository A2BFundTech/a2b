"use client";

import { Button } from "@/components/ui/button";
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
import { logout } from "@/features/auth/hooks/useLogout";

import {
    House,
    UserStar,
    FolderPlus,
    Handshake,
    Trash2,
    LogOut,
    Toolbox,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
    const { open, setOpenMobile, openMobile } = useSidebar();
    const pathname = usePathname();

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
                                    <Link href="/" onClick={mobileCloseMenu}>
                                        <House />
                                        <span>Website</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                {/* <SidebarMenuButton
                                    asChild
                                    isActive={pathname === "/panel"}
                                    className="data-[active=true]:bg-[#917355]/15 data-[active=true]:text-[#917355] data-[active=true]:border-l-2 data-[active=true]:border-[#917355] data-[active=true]:font-semibold"
                                >
                                    <Link
                                        href="/panel"
                                        onClick={mobileCloseMenu}
                                    >
                                        <Toolbox />
                                        <span>Guide</span>
                                    </Link>
                                </SidebarMenuButton> */}
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={
                                        pathname === "/panel/projects-add"
                                    }
                                    className="data-[active=true]:bg-[#917355]/15 data-[active=true]:text-[#917355] data-[active=true]:border-l-2 data-[active=true]:border-[#917355] data-[active=true]:font-semibold"
                                >
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
                                <SidebarMenuButton
                                    asChild
                                    isActive={
                                        pathname === "/panel/projects-edit"
                                    }
                                    className="data-[active=true]:bg-[#917355]/15 data-[active=true]:text-[#917355] data-[active=true]:border-l-2 data-[active=true]:border-[#917355] data-[active=true]:font-semibold"
                                >
                                    <Link
                                        href="/panel/projects-edit"
                                        onClick={mobileCloseMenu}
                                    >
                                        <Trash2 />
                                        <span>Edit projects</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button
                    onClick={logout}
                    className="group/logout"
                    variant="custom"
                >
                    <div className="flex items-center gap-2">
                        <span>Logout</span>
                        <LogOut className="transition-transform duration-350 group-hover/logout:translate-x-1" />
                    </div>
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
