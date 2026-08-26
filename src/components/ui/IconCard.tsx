interface IconCardProps {
    icon: string;
    title: string;
    body?: string;
    iconColor?: string;
    variant?: "default" | "icon-pill";
}

export default function IconCard({
    icon,
    title,
    body,
    iconColor = "var(--color-soft-teal)",
    variant = "default",
}: IconCardProps) {
    const isIconPill = variant === "icon-pill";

    return (
        <div
            className="p-8 rounded-xl flex flex-col gap-4 border transition-colors duration-300"
            style={{
                backgroundColor: "var(--color-surface-container-low)",
                borderColor:
                    "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
            }}
        >
            {isIconPill ? (
                <div
                    className="p-3 rounded-full w-fit"
                    style={{ backgroundColor: "var(--color-secondary-fixed)" }}
                >
                    <span
                        className="material-symbols-outlined"
                        style={{ color: "var(--color-secondary)" }}
                    >
                        {icon}
                    </span>
                </div>
            ) : (
                <span
                    className="material-symbols-outlined text-3xl"
                    style={{ color: iconColor }}
                >
                    {icon}
                </span>
            )}
            <h3
                className="text-headline-sm"
                style={{ color: "var(--color-primary)" }}
            >
                {title}
            </h3>
            {body && (
                <p
                    className="text-body-md flex-grow"
                    style={{ color: "var(--color-on-surface-variant)" }}
                >
                    {body}
                </p>
            )}
        </div>
    );
}
