import { ReactNode } from "react";

interface SectionHeadingProps {
    title: string;
    body?: string;
    centered?: boolean;
    color?: string;
    children?: ReactNode;
}

export default function SectionHeading({
    title,
    body,
    centered = false,
    color = "var(--color-primary)",
    children,
}: SectionHeadingProps) {
    return (
        <div className={`mb-12 ${centered ? "text-center" : "text-left"}`}>
            <h2
                className="text-headline-lg mb-3"
                style={{ color }}
            >
                {title}
            </h2>
            {body && (
                <p
                    className={`text-body-md max-w-2xl ${centered ? "mx-auto" : ""}`}
                    style={{ color: "var(--color-on-surface-variant)" }}
                >
                    {body}
                </p>
            )}
            {children}
        </div>
    );
}
