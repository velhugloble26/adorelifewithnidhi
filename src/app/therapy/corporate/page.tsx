"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";



const CORPORATE_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB_nBgI2lDrccJ2yS_VMvcHaIQb6i2yIQU5kRelQZFOhIR65T3SSutggEWZS_KlknduIVoZrAnnasgtf2YZSy5gAjBvmvlMkzhWx5J5T9q5NQjY4nQBdT_AOOC4KN_d4j-IaWJBRG-S8FknAKpcz_NEFHN28Dvpv53jJr1Mt-URQfzay-NKO2OGMV_Dh_5rZ53GxZ2vH5jQbXvAdqnh2Uyc3Ih1nWT11nnF92ndh_HiZJ8uo0eFfXlP";

const challenges = [
    { icon: "battery_0_bar", title: "Burnout", body: "Chronic exhaustion leading to decreased efficacy and personal detachment." },
    { icon: "psychology", title: "Stress", body: "Elevated pressure impacting decision-making and interpersonal dynamics." },
    { icon: "link_off", title: "Disengagement", body: "A gradual withdrawal of discretionary effort and emotional commitment." },
    { icon: "groups", title: "Turnover", body: "The costly loss of valuable talent seeking healthier environments." },
];

export default function CorporateWellbeingPage() {
    return (
        <>
            <Navbar />

            <main>
                {/* ── Breadcrumb ── */}
                <nav className="section-pad pt-6 max-w-[1440px] mx-auto" aria-label="Breadcrumb">
                    <ol className="flex gap-2 text-label-md" style={{ color: "var(--color-stone-grey)" }}>
                        <li><Link href="/therapy" style={{ color: "var(--color-stone-grey)" }}>Therapy</Link></li>
                        <li aria-hidden="true">/</li>
                        <li style={{ color: "var(--color-primary)" }}>Corporate Wellbeing</li>
                    </ol>
                </nav>

                {/* ── Hero ── */}
                <section className="section-pad py-16 md:py-32 flex flex-col md:flex-row items-center gap-12 max-w-[1440px] mx-auto">
                    <div className="flex-1 space-y-6">
                        <h1 className="text-display-lg" style={{ color: "var(--color-primary)" }}>
                            Healthier workplaces begin with understanding people.
                        </h1>
                        <p className="text-body-lg max-w-2xl" style={{ color: "var(--color-on-surface-variant)" }}>
                            We partner with forward-thinking organisations to cultivate environments where
                            individuals thrive. Emotional safety and resilience are the foundation of
                            sustainable success.
                        </p>
                        <div className="pt-4">
                            <Link
                                href="/conversation"
                                className="inline-flex items-center gap-2 text-label-md transition-colors group"
                                style={{ color: "var(--color-primary)" }}
                                onMouseEnter={(e) =>
                                    ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-soft-teal)")
                                }
                                onMouseLeave={(e) =>
                                    ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-primary)")
                                }
                            >
                                Start a Conversation
                                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                                    arrow_forward
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 w-full relative">
                        <div
                            className="aspect-[4/3] rounded-lg overflow-hidden"
                            style={{ backgroundColor: "var(--color-muted-sand)" }}
                        >
                            <img
                                src={CORPORATE_IMG}
                                alt="A serene, modern office environment with soft natural light."
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* ── What Organisations Are Seeing ── */}
                <section
                    className="section-pad py-16 md:py-32 mb-16 md:mb-32 mx-4 md:mx-auto max-w-[1440px] rounded-3xl"
                    style={{ backgroundColor: "var(--color-warm-ivory)" }}
                >
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-headline-lg mb-4" style={{ color: "var(--color-primary)" }}>
                            What organisations are often seeing
                        </h2>
                        <p className="text-body-md" style={{ color: "var(--color-on-surface-variant)" }}>
                            The modern workplace demands more than just output. When emotional wellbeing
                            is overlooked, the signs become visible across the organisation.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {challenges.map((c) => (
                            <div
                                key={c.title}
                                className="p-8 rounded-lg flex flex-col items-start gap-4 transition-colors duration-500"
                                style={{ backgroundColor: "var(--color-surface)" }}
                                onMouseEnter={(e) =>
                                    ((e.currentTarget as HTMLDivElement).style.backgroundColor = "var(--color-muted-sand)")
                                }
                                onMouseLeave={(e) =>
                                    ((e.currentTarget as HTMLDivElement).style.backgroundColor = "var(--color-surface)")
                                }
                            >
                                <div
                                    className="p-3 rounded-full flex items-center justify-center shrink-0"
                                    style={{
                                        backgroundColor: "var(--color-secondary-fixed)",
                                        color: "var(--color-secondary)",
                                    }}
                                >
                                    <span className="material-symbols-outlined">{c.icon}</span>
                                </div>
                                <h3 className="text-headline-md" style={{ color: "var(--color-primary)" }}>
                                    {c.title}
                                </h3>
                                <p className="text-body-md" style={{ color: "var(--color-on-surface-variant)" }}>
                                    {c.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

        </>
    );
}
