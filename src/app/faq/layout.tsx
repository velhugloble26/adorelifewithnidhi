import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Frequently Asked Questions",
    description:
        "Exploring therapy is a significant step. We've gathered some common questions to help bring clarity and peace of mind as you consider beginning this process.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
