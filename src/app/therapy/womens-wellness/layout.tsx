import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Women's Wellness Therapy",
    description:
        "A dedicated, compassionate therapy space for women navigating postpartum changes, self-worth, hormonal shifts, relationship dynamics and life transitions — with Nidhi Roy at Adore Life, Thane.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
