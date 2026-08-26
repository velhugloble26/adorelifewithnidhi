import { ReactNode } from "react";

interface PageHeroProps {
    eyebrow?: string;
    headline: string;
    body?: string;
    children?: ReactNode; // CTA buttons etc.
    centered?: boolean;
}

export default function PageHero({
    eyebrow,
    headline,
    body,
    children,
    centered = false,
}: PageHeroProps) {
    return (
        <section
            className={`section-pad w-full max-w-[1440px] mx-auto py-20 md:py-32 flex flex-col gap-6 ${centered ? "items-center text-center" : "items-start"
                }`}
        >
            {eyebrow && (
                <p
                    className="text-label-md uppercase tracking-widest"
                    style={{ color: "var(--color-soft-teal)" }}
                >
                    {eyebrow}
                </p>
            )}
            <h1
                className="text-display-lg leading-tight max-w-4xl"
                style={{ color: "var(--color-primary)" }}
            >
                {headline}
            </h1>
            {body && (
                <p
                    className="text-body-lg max-w-2xl"
                    style={{ color: "var(--color-on-surface-variant)" }}
                >
                    {body}
                </p>
            )}
            {children && (
                <div className={`flex gap-4 flex-wrap mt-2 ${centered ? "justify-center" : ""}`}>
                    {children}
                </div>
            )}
        </section>
    );
}
