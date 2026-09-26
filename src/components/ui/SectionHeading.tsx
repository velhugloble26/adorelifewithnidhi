import { ReactNode } from "react";
import { MotionItem, MotionStagger } from "./Motion";

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
        <MotionStagger className={`mb-12 ${centered ? "text-center" : "text-left"}`}>
            <MotionItem>
            <h2
                className="text-headline-lg mb-3"
                style={{ color }}
            >
                {title}
            </h2>
            </MotionItem>
            {body && (
                <MotionItem>
                <p
                    className={`text-body-md max-w-2xl ${centered ? "mx-auto" : ""}`}
                    style={{ color: "var(--color-on-surface-variant)" }}
                >
                    {body}
                </p>
                </MotionItem>
            )}
            {children && <MotionItem>{children}</MotionItem>}
        </MotionStagger>
    );
}
