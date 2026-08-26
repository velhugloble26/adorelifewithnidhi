interface NumberedStep {
    label: string;
    body: string;
}

interface ProcessStepsProps {
    steps: NumberedStep[];
}

export default function ProcessSteps({ steps }: ProcessStepsProps) {
    return (
        <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
                <div
                    key={step.label}
                    className="flex flex-col md:flex-row gap-6 md:gap-12 items-start py-8 border-t"
                    style={{
                        borderColor:
                            "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
                    }}
                >
                    <div
                        className="text-display-lg font-light w-12 shrink-0"
                        style={{ color: "var(--color-stone-grey)" }}
                    >
                        {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3
                            className="text-headline-sm"
                            style={{ color: "var(--color-primary)" }}
                        >
                            {step.label}
                        </h3>
                        <p
                            className="text-body-lg max-w-xl"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            {step.body}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
