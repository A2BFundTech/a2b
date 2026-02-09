"use client";

import { useLayoutEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, notFound } from "next/navigation";
import { useLocale } from "next-intl";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth/hooks/useLogout";
import { fetchAuthUser } from "@/features/auth/api/fetchAuthUser";

export default function AdminPage() {
    const router = useRouter();
    const locale = useLocale();
    const [status, setStatus] = useState<"loading" | "authorized">("loading");

    useLayoutEffect(() => {
        const loginPath = `/${locale}`;

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.replace(loginPath);
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
                router.replace(loginPath);
            }
        });

        return () => unsubscribe();
    }, [router, locale]);

    const handleLogout = async () => {
        try {
            await logout();
            router.replace("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    if (status === "loading") {
        return null;
    }

    return (
        <div className="font-sans">
            <p>Admin Page</p>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}