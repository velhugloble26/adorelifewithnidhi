import { ReactNode } from "react";

interface CtaSectionProps {
    icon?: string;
    headline: string;
    body?: string;
    children: ReactNode;
    bg?: string;
    headlineColor?: string;
    bodyColor?: string;
}

export default function CtaSection({
    icon,
    headline,
    body,
    children,
    bg = "var(--color-secondary-fixed)",
    headlineColor = "var(--color-on-secondary-fixed)",
    bodyColor = "var(--color-on-secondary-fixed-variant)",
}: CtaSectionProps) {
    return (
        <section
            className="w-full py-16 md:py-24 flex flex-col items-center justify-center text-center"
            style={{ backgroundColor: bg }}
        >
            <div className="section-pad max-w-2xl mx-auto">
                {icon && (
                    <span
                        className="material-symbols-outlined mb-6 text-4xl block"
                        style={{ color: bodyColor }}
                    >
                        {icon}
                    </span>
                )}
                <h2
                    className="text-display-lg mb-6"
                    style={{ color: headlineColor }}
                >
                    {headline}
                </h2>
                {body && (
                    <p
                        className="text-body-lg mb-10"
                        style={{ color: bodyColor }}
                    >
                        {body}
                    </p>
                )}
                <div className="flex gap-4 justify-center flex-wrap">{children}</div>
            </div>
        </section>
    );
}
