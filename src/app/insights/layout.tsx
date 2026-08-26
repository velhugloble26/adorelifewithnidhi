import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Insights & Resources",
    description:
        "Explore curated insights, guided reflections, and practical resources designed to foster emotional clarity and self-compassion.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
