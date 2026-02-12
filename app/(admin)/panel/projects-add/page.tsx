"use client";

import { AddProject } from "@/components/admin/add-project/AddProject";

export default function ProjectsPage() {
    return (
        <div className="w-full flex justify-center items-center md:p-4">
            <div className="flex flex-col w-full justify-center items-center gap-10 max-w-[1720px] font-sans">
                <AddProject />
            </div>
        </div>
    );
}
