interface PullQuoteProps {
    quote: string;
    attribution?: string;
    bg?: string;
}

export default function PullQuote({
    quote,
    attribution,
    bg = "var(--color-warm-ivory)",
}: PullQuoteProps) {
    return (
        <section
            className="w-full py-16 md:py-24 text-center"
            style={{ backgroundColor: bg }}
        >
            <div className="section-pad max-w-4xl mx-auto">
                <span
                    className="material-symbols-outlined mb-6 text-4xl opacity-40 block"
                    style={{ color: "var(--color-soft-teal)" }}
                >
                    format_quote
                </span>
                <blockquote
                    className="text-quote-intense italic"
                    style={{ color: "var(--color-primary)" }}
                >
                    {quote}
                </blockquote>
                {attribution && (
                    <p
                        className="text-body-md mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        {attribution}
                    </p>
                )}
                <div
                    className="w-16 h-px mx-auto mt-8"
                    style={{ backgroundColor: "var(--color-stone-grey)" }}
                />
            </div>
        </section>
    );
}
