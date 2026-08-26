import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Schools & Colleges",
    description:
        "Adore Life partners with schools and colleges to build emotional wellbeing programmes for students, parents, teachers and leadership — equipping entire communities with the tools to navigate growing up.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
