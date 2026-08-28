"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";



const FEATURED_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAXXUyvWnH81GZFujjW_UsqCJtE1SPPqPO5QU-32ThwQYNyoXrppQdBbscc1mRBLBEnpHaVGdEuo_ik16C4WTJ0wo9vaDBvdaZ_Q-Y2H8hNpFGA-B8VOlMYL6nu8FIO6rrddsLp846Zj5o2gs3_ZLUAffST1DbkKiRIZduDIVdWKH0-jL-6Hq3a9I81wCx4J3queZ-gYR46_GiCpYZheInBy6Yn9GJiCT2eumSgasDQ4bfW19FKyaXB";

const themes = [
    { icon: "psychology", title: "Understanding Yourself", body: "Unpack core beliefs and identity." },
    { icon: "diversity_1", title: "Relationships", body: "Navigating connection and boundaries." },
    { icon: "self_improvement", title: "Emotional Wellbeing", body: "Tools for regulation and calm." },
    { icon: "menu_book", title: "Psychology Made Simple", body: "Accessible concepts for everyday life." },
];

export default function InsightsPage() {
    return (
        <>
            <Navbar />

            <main className="section-pad py-16 md:py-32 w-full max-w-[1440px] mx-auto flex flex-col items-center">
                {/* ── Hero ── */}
                <section className="text-center max-w-3xl mx-auto mb-16 md:mb-32">
                    <h1 className="text-display-lg mb-6 ui-heading">
                        A little more understanding can change the way you see yourself.
                    </h1>
                    <p className="text-body-lg ui-copy">
                        Explore curated insights, guided reflections, and practical resources
                        designed to foster emotional clarity and self-compassion. This is a quiet
                        space to learn, unlearn, and grow at your own pace.
                    </p>
                </section>

                {/* ── Featured Insight ── */}
                <section className="w-full mb-16 md:mb-32">
                    <div
                        className="rounded-xl overflow-hidden flex flex-col md:flex-row border shadow-sm"
                        style={{
                            backgroundColor: "var(--color-warm-ivory)",
                            borderColor: "var(--color-surface-container-high)",
                        }}
                    >
                        <div className="md:w-1/2 relative h-64 md:h-auto">
                            <img
                                className="absolute inset-0 w-full h-full object-cover"
                                src={FEATURED_IMG}
                                alt="A serene photograph of a woman thoughtfully writing in a journal by a window."
                            />
                        </div>
                        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                            <span
                                className="inline-block px-4 py-1 rounded-full text-label-md w-max mb-6"
                                style={{
                                    backgroundColor: "color-mix(in srgb, var(--color-muted-sand) 50%, transparent)",
                                    color: "var(--color-stone-grey)",
                                }}
                            >
                                Featured
                            </span>
                            <h2 className="text-headline-lg mb-4 ui-heading">
                                Why do I know what to do, but still find myself doing the opposite?
                            </h2>
                            <p className="text-body-md mb-8 ui-copy">
                                Understanding the disconnect between our logical intentions and
                                emotional responses. A gentle exploration of self-sabotage and how to
                                cultivate alignment without self-judgment.
                            </p>
                            <Link
                                href="#"
                                className="text-label-md w-max pb-1 transition-colors border-b ui-link-accent"
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-primary)";
                                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-primary)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-soft-teal)";
                                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-soft-teal)";
                                }}
                            >
                                Read the Article
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── Category Grid ── */}
                <section className="w-full">
                    <h3 className="text-headline-md mb-8 text-center ui-heading">
                        Explore by Theme
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {themes.map((theme, i) => (
                            <Link
                                key={i}
                                href="#"
                                className="group block p-8 rounded-xl border transition-colors"
                                style={{
                                    backgroundColor: "var(--color-surface-container-low)",
                                    borderColor: "var(--color-surface-container-high)",
                                }}
                                onMouseEnter={(e) =>
                                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "color-mix(in srgb, var(--color-secondary-fixed-dim) 20%, var(--color-surface-container-low))")
                                }
                                onMouseLeave={(e) =>
                                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-surface-container-low)")
                                }
                            >
                                <div className="h-12 flex items-center mb-2">
                                    <span
                                        className="material-symbols-outlined text-3xl transition-transform group-hover:scale-110"
                                        style={{
                                            color:
                                                i === 0 || i === 3
                                                    ? "var(--color-soft-teal)"
                                                    : i === 1
                                                        ? "var(--color-sage-green)"
                                                        : "var(--color-stone-grey)",
                                        }}
                                    >
                                        {theme.icon}
                                    </span>
                                </div>
                                <h4 className="text-headline-md mb-2 ui-heading">
                                    {theme.title}
                                </h4>
                                <p className="text-body-md ui-copy">
                                    {theme.body}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

        </>
    );
}
