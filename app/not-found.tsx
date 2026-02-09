import Link from "next/link";

export default function NotFound() {
    return (
        <div>
            <p>404 Not Found</p>
            <Link href="/">Back to website</Link>
        </div>
    )
}