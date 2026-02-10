"use client";

import { EditProjects } from "@/components/admin/view-project/EditProjects";

export default function EditProjectsPage() {
    return (
        <div className="w-full flex justify-center items-center p-4">
            <div className="flex flex-col w-full justify-center items-center gap-10 max-w-[1720px] font-sans">
                <EditProjects />
            </div>
        </div>
    );
}
