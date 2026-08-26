"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const HERO_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA3HgN9o_3LIWOg_w-VPYvsYJUG2Ip8uk_Wqm1tFZ9nW5sxVf3j1M7a041_5FDzLl2WfXGdkCRi-3_9H_BaiR-OphD8m7ZUaxL-i6ugX75JiR6CXa0P3n3X3OiuJ6GX2IVtRAkvO7ZHOVPx2i4-_lkcVZt7bSC2rZKBGGF5mcGcaFzpnxx8smSCVxBscB8eQX_95IIioy8B7fIUjYDYkx9i-qEUCbKdCiIql7d5l5HCr95mcswlTRDq";

const themes = [
    {
        icon: "favorite",
        title: "Postpartum & Motherhood",
        body: "Navigating the emotional complexities of becoming a mother — identity shifts, overwhelm, guilt and the unspoken weight of new parenthood.",
    },
    {
        icon: "self_improvement",
        title: "Self-Worth & Body Image",
        body: "Untangling internalised messages about how you should look, feel, or perform — and finding your way back to yourself.",
    },
    {
        icon: "sync_problem",
        title: "Hormonal & Cyclical Changes",
        body: "Understanding how hormonal fluctuations — PMS, PCOD, perimenopause — affect your mood, energy and sense of self.",
    },
    {
        icon: "psychology",
        title: "Anxiety & Perfectionism",
        body: "When the pressure to have it all together becomes a quiet form of self-betrayal.",
    },
    {
        icon: "family_restroom",
        title: "Relationship Dynamics",
        body: "Exploring how you show up in relationships — as a partner, daughter, friend — and where you might be disappearing.",
    },
    {
        icon: "transition_slide",
        title: "Identity & Life Transitions",
        body: "Career changes, relationship endings, relocations — the moments that ask you to redefine who you are.",
    },
];

const processSteps = [
    {
        label: "A Gentle Beginning",
        body: "We start where you are — no pressure to have a clear agenda. Often, just speaking what's been unsaid is the first relief.",
    },
    {
        label: "Exploring Your Inner World",
        body: "Together, we look at the patterns, beliefs and stories that shape how you experience yourself and your relationships.",
    },
    {
        label: "Reclaiming Your Voice",
        body: "We work on reconnecting you with your needs, boundaries and sense of self — often quietened by years of putting others first.",
    },
    {
        label: "Building From the Inside",
        body: "You leave not just feeling better, but with a deeper, more compassionate understanding of who you are and what you deserve.",
    },
];

const quotes = [
    "\"For the first time, I felt like I was allowed to take up space.\"",
    "\"She helped me understand why I kept shrinking.\"",
    "\"I finally stopped apologising for having needs.\"",
];

export default function WomensWellnessPage() {
    return (
        <>
            <Navbar />

            <main className="pt-16">
                {/* ── Hero ── */}
                <section
                    className="section-pad w-full max-w-[1440px] mx-auto py-20 md:py-32 flex flex-col md:flex-row items-center gap-16"
                >
                    <div className="md:w-1/2 flex flex-col gap-6">
                        <p
                            className="text-label-md uppercase tracking-widest"
                            style={{ color: "var(--color-soft-teal)" }}
                        >
                            Therapy for Women
                        </p>
                        <h1
                            className="text-display-lg leading-tight"
                            style={{ color: "var(--color-primary)" }}
                        >
                            A space that holds all of you.
                        </h1>
                        <p
                            className="text-body-lg max-w-lg"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Women's wellness therapy at Adore Life is a dedicated space to explore what
                            it means to exist as a woman — the pressures, the roles, the invisible weight
                            you carry — without judgment, in complete confidence.
                        </p>
                        <div className="flex gap-4 flex-wrap mt-2">
                            <Link
                                href="/conversation"
                                className="btn-primary"
                                style={{ paddingTop: "0.875rem", paddingBottom: "0.875rem", paddingLeft: "2rem", paddingRight: "2rem" }}
                            >
                                Begin a Conversation
                            </Link>
                            <Link
                                href="/therapy"
                                className="btn-secondary"
                                style={{ paddingTop: "0.875rem", paddingBottom: "0.875rem", paddingLeft: "2rem", paddingRight: "2rem" }}
                            >
                                All Therapy Services
                            </Link>
                        </div>
                    </div>
                    <div
                        className="md:w-1/2 w-full aspect-[4/3] rounded-xl overflow-hidden"
                        style={{ backgroundColor: "var(--color-surface-container)" }}
                    >
                        <img
                            src={HERO_IMG}
                            alt="A woman in a calm, light-filled space — reflecting quiet and safety"
                            className="w-full h-full object-cover mix-blend-multiply opacity-90"
                        />
                    </div>
                </section>

                {/* ── Intro ── */}
                <section
                    className="w-full py-16 md:py-24"
                    style={{ backgroundColor: "var(--color-warm-ivory)" }}
                >
                    <div className="section-pad w-full max-w-[1440px] mx-auto flex flex-col md:flex-row gap-16 items-start">
                        <div className="md:w-1/3 md:sticky md:top-32">
                            <h2
                                className="text-headline-lg mb-4"
                                style={{ color: "var(--color-primary)" }}
                            >
                                Why a dedicated space matters
                            </h2>
                            <div
                                className="w-12 h-px"
                                style={{ backgroundColor: "var(--color-stone-grey)" }}
                            />
                        </div>
                        <div
                            className="md:w-2/3 flex flex-col gap-6 text-body-lg"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            <p>
                                Women navigate a particular kind of complexity — societal expectations,
                                relational roles, biological realities and the quiet erosion that comes from
                                years of putting others first. These experiences are valid, and they deserve
                                a space intentionally designed to receive them.
                            </p>
                            <p>
                                Women's wellness therapy at Adore Life is not about labelling or pathologising.
                                It's about creating the conditions in which you can finally exhale — and begin to
                                understand, with compassion, the woman you have become and the woman you want to be.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Themes ── */}
                <section className="section-pad w-full max-w-[1440px] mx-auto py-16 md:py-28">
                    <h2
                        className="text-headline-lg text-center mb-4"
                        style={{ color: "var(--color-primary)" }}
                    >
                        What we explore together
                    </h2>
                    <p
                        className="text-body-lg text-center mx-auto max-w-xl mb-14"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        These themes often surface in women&apos;s wellness work. Every session is led by you.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {themes.map((theme) => (
                            <div
                                key={theme.title}
                                className="p-8 rounded-xl flex flex-col gap-4 border"
                                style={{
                                    backgroundColor: "var(--color-surface-container-low)",
                                    borderColor: "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
                                }}
                            >
                                <span
                                    className="material-symbols-outlined text-3xl"
                                    style={{ color: "var(--color-soft-teal)" }}
                                >
                                    {theme.icon}
                                </span>
                                <h3
                                    className="text-title-md"
                                    style={{ color: "var(--color-primary)" }}
                                >
                                    {theme.title}
                                </h3>
                                <p
                                    className="text-body-md"
                                    style={{ color: "var(--color-on-surface-variant)" }}
                                >
                                    {theme.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Quotes ── */}
                <section
                    className="w-full py-16 md:py-24"
                    style={{ backgroundColor: "var(--color-secondary-fixed)" }}
                >
                    <div className="section-pad max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {quotes.map((q) => (
                            <blockquote
                                key={q}
                                className="text-quote-intense italic text-center"
                                style={{ color: "var(--color-on-secondary-fixed)" }}
                            >
                                {q}
                            </blockquote>
                        ))}
                    </div>
                </section>

                {/* ── Process ── */}
                <section className="section-pad w-full max-w-[1440px] mx-auto py-16 md:py-28">
                    <h2
                        className="text-headline-lg mb-14"
                        style={{ color: "var(--color-primary)" }}
                    >
                        How the work unfolds
                    </h2>
                    <div className="flex flex-col gap-0">
                        {processSteps.map((step, i) => (
                            <div
                                key={step.label}
                                className="flex flex-col md:flex-row gap-6 md:gap-12 items-start py-8 border-t"
                                style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)" }}
                            >
                                <div
                                    className="text-display-lg font-light w-8 shrink-0"
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
                </section>

                {/* ── CTA ── */}
                <section
                    className="w-full py-16 md:py-24 text-center"
                    style={{ backgroundColor: "var(--color-tertiary-fixed)" }}
                >
                    <div className="section-pad max-w-[600px] mx-auto">
                        <h2
                            className="text-display-lg mb-6"
                            style={{ color: "var(--color-on-tertiary-fixed)" }}
                        >
                            You don&apos;t have to hold it all alone.
                        </h2>
                        <p
                            className="text-body-lg mb-10"
                            style={{ color: "var(--color-on-tertiary-fixed-variant)" }}
                        >
                            Whenever you&apos;re ready — even if you&apos;re not quite sure what you need yet —
                            reaching out is enough of a start.
                        </p>
                        <Link
                            href="/conversation"
                            className="btn-primary inline-flex"
                            style={{ paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                        >
                            Begin a Conversation
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
