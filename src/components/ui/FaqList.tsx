interface FaqItem {
    q: string;
    a: string;
}

interface FaqListProps {
    items: FaqItem[];
}

export default function FaqList({ items }: FaqListProps) {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {items.map((item) => (
                <div
                    key={item.q}
                    className="pb-4 border-b"
                    style={{
                        borderColor:
                            "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
                    }}
                >
                    <h4
                        className="text-headline-sm mb-2"
                        style={{ color: "var(--color-soft-teal)" }}
                    >
                        {item.q}
                    </h4>
                    <p
                        className="text-body-md"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        {item.a}
                    </p>
                </div>
            ))}
        </div>
    );
}
