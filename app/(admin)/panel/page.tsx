"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
    const router = useRouter();

    return (
        <div className="font-sans flex items-start justify-center gap-4 w-full p-2">
            <div className=" max-w-3xl w-full flex flex-col justify-between items-center h-full">
                <p>Management Page</p>
                <div></div>
                <div className="flex">
                    <Button onClick={() => router.push("/panel")}>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
