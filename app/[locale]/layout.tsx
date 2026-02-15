import type { Metadata } from "next";
import { getMetadataForLocale } from "@/components/meta-data/meta-data";

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return getMetadataForLocale(locale);
}

export default function LocaleLayout({ children }: Props) {
    return <>{children}</>;
}
