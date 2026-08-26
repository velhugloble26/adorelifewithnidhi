import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Begin a Conversation",
    description:
        "Reach out to Adore Life to begin your therapy journey. Fill in the form or contact Nidhi Roy directly by phone, WhatsApp, or email.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
