import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Workshops & Webinars",
    description:
        "Bringing the insights of clinical psychology into practical, everyday contexts for teams, communities, and individuals.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
