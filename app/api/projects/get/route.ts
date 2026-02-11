import { Project } from "@/features/card/model/types";
import { ApiError, getErrorMessage } from "@/lib/api-error";
import { adminDb } from "@/server/firebase-admin/firebase-admin";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const snapshot = await adminDb
            .collection("projects")
            .orderBy("createdAt", "desc")
            .get();

        const projects: Project[] = snapshot.docs.map((doc) => {
            const data = doc.data() as Omit<Project, "id">;
            return {
                id: doc.id,
                ...data,
            };
        });

        return NextResponse.json(projects, { status: 200 });
    } catch (error: unknown) {
        console.error("Projects GET error:", error);
        const message = getErrorMessage(error);

        return NextResponse.json(
            {
                message,
                status: 500,
            } as ApiError,
            { status: 500 },
        );
    }
}
