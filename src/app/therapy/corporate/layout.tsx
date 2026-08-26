import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Corporate Wellbeing",
    description:
        "Healthier workplaces begin with understanding people. We partner with organisations to cultivate environments where individuals and teams thrive.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
