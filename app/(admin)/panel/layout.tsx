"use client";
import AppBread from "@/components/admin/nav/app-bread";
import AppSidebar from "@/components/admin/nav/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useLayoutEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, notFound } from "next/navigation";
import { auth } from "@/lib/firebase";
import { fetchAuthUser } from "@/features/auth/api/fetchAuthUser";

const LOGIN_PATH = "/auth/login";

export default function AdminPanelLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const router = useRouter();
     const [status, setStatus] = useState<"loading" | "authorized">("loading");

     useLayoutEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, async (user) => {
         if (!user) {
           router.replace(LOGIN_PATH);
           return;
         }
         try {
           const me = await fetchAuthUser();
           if (!me.isAdmin) {
             notFound();
             return;
           }
           setStatus("authorized");
         } catch {
           router.replace(LOGIN_PATH);
         }
       });

       return () => unsubscribe();
     }, [router]);

     if (status === "loading") {
       // ничего не показываем: ни сайдбар, ни topbar
       return null;
     }
    
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <SidebarProvider>
                <AppSidebar />
                <main className="flex max-h-screen flex-1 flex-col">
                    <div className="bg-sidebar border-sidebar-border flex items-center gap-2 border-b p-2">
                        <SidebarTrigger className="size-8 cursor-pointer" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4!"
                        />
                        <AppBread />
                    </div>
                    <section className="relative flex flex-1 overflow-hidden shadow-[inset_0_0_10px_0] shadow-black/10">
                        {children}
                    </section>
                </main>
            </SidebarProvider>
        </div>
    );
}
