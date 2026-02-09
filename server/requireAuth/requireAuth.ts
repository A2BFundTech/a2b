import "server-only";
import { adminAuth } from "../firebase-admin/firebase-admin";

export type DecodedToken = Awaited<ReturnType<typeof adminAuth.verifyIdToken>> & {
    admin?: boolean;
};

export async function requireAuth(req: Request): Promise<DecodedToken> {
    const header = req.headers.get("authorization") || "";
    const match = header.match(/^Bearer (.+)$/i);
    const token = match?.[1];

    if (!token) {
        throw new Error("Missing Authorization: Bearer token");
    }

    const decoded = await adminAuth.verifyIdToken(token);
    return decoded as DecodedToken;
}

export async function requireAdmin(req: Request): Promise<DecodedToken> {
    const decoded = await requireAuth(req);
    if (!decoded.admin) {
        const err = new Error("Forbidden: admin role required");
        (err as Error & { status?: number }).status = 403;
        throw err;
    }
    return decoded;
}
