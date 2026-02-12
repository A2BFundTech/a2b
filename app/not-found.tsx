"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { ArrowUpRight, SearchAlert } from "lucide-react";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="w-full h-full min-h-screen flex flex-col justify-center items-center bg-[#D4CAC1] relative">
            <div className="flex flex-col justify-center items-center gap-4 bg-[#d2bba6]/70 w-full py-10 px-4 z-10">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-4xl font-bold text-white">
                        404 Not Found
                    </p>
                    <SearchAlert aria-hidden className="size-12 text-white/80" />
                </div>
                <Button
                    variant="link"
                    onClick={() => router.push("/")}
                    className="text-white text-xl"
                >
                    <span>Back to website</span>
                    <ArrowUpRight className="size-5" />
                </Button>
            </div>
        </div>
    );
}
