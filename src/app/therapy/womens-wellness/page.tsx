import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { MotionSection, MotionText, MotionStagger, MotionItem, MotionReveal } from "@/components/ui/Motion";

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
                <MotionSection
                    className="section-pad w-full max-w-[1440px] mx-auto py-20 md:py-32 flex flex-col md:flex-row items-center gap-16"
                >
                    <div className="md:w-1/2 flex flex-col gap-6">
                        <MotionReveal delay={0.1}>
                            <p
                                className="text-label-md uppercase tracking-widest ui-accent"
                            >
                                Therapy for Women
                            </p>
                        </MotionReveal>
                        <MotionText>
                            <h1
                                className="text-display-lg leading-tight ui-heading"
                            >
                                A space that holds all of you.
                            </h1>
                        </MotionText>
                        <MotionReveal delay={0.2}>
                            <p
                                className="text-body-lg max-w-lg ui-copy"
                            >
                                Women's wellness therapy at Adore Life is a dedicated space to explore what
                                it means to exist as a woman — the pressures, the roles, the invisible weight
                                you carry — without judgment, in complete confidence.
                            </p>
                        </MotionReveal>
                        <MotionReveal delay={0.4} className="flex gap-4 flex-wrap mt-2">
                            <Link
                                href="/conversation"
                                className="btn-primary btn-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                            >
                                Begin a Conversation
                            </Link>
                            <Link
                                href="/therapy"
                                className="btn-secondary btn-md hover:-translate-y-1 transition-all duration-300"
                            >
                                All Therapy Services
                            </Link>
                        </MotionReveal>
                    </div>
                    <MotionReveal delay={0.3} direction="left" className="md:w-1/2 w-full relative group">
                        <div
                            className="w-full aspect-[4/3] rounded-xl overflow-hidden surface-container"
                        >
                            <Image
                                src={HERO_IMG}
                                alt="A woman in a calm, light-filled space — reflecting quiet and safety"
                                width={1600}
                                height={900}
                                className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-1000 ease-out group-hover:scale-[1.15]"
                            />
                        </div>
                    </MotionReveal>
                </MotionSection>

                {/* ── Intro ── */}
                <MotionSection
                    className="w-full py-16 md:py-24 surface-ivory"
                >
                    <div className="section-pad w-full max-w-[1440px] mx-auto flex flex-col md:flex-row gap-16 items-start">
                        <div className="md:w-1/3 md:sticky md:top-32">
                            <MotionText>
                                <h2
                                    className="text-headline-lg mb-4 ui-heading"
                                >
                                    Why a dedicated space matters
                                </h2>
                            </MotionText>
                            <div
                                className="w-12 h-px divider-muted"
                            />
                        </div>
                        <MotionStagger
                            amount={0.2}
                            className="md:w-2/3 flex flex-col gap-6 text-body-lg ui-copy"
                        >
                            <MotionItem>
                                <p>
                                    Women navigate a particular kind of complexity — societal expectations,
                                    relational roles, biological realities and the quiet erosion that comes from
                                    years of putting others first. These experiences are valid, and they deserve
                                    a space intentionally designed to receive them.
                                </p>
                            </MotionItem>
                            <MotionItem>
                                <p>
                                    Women's wellness therapy at Adore Life is not about labelling or pathologising.
                                    It's about creating the conditions in which you can finally exhale — and begin to
                                    understand, with compassion, the woman you have become and the woman you want to be.
                                </p>
                            </MotionItem>
                        </MotionStagger>
                    </div>
                </MotionSection>

                {/* ── Themes ── */}
                <MotionSection className="section-pad w-full max-w-[1440px] mx-auto py-16 md:py-28">
                    <MotionText>
                        <h2
                            className="text-headline-lg text-center mb-4 ui-heading"
                        >
                            What we explore together
                        </h2>
                    </MotionText>
                    <MotionReveal delay={0.2}>
                        <p
                            className="text-body-lg text-center mx-auto max-w-xl mb-14 ui-copy"
                        >
                            These themes often surface in women&apos;s wellness work. Every session is led by you.
                        </p>
                    </MotionReveal>
                    <MotionStagger amount={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {themes.map((theme) => (
                            <MotionItem key={theme.title}>
                                <div
                                    className="p-8 rounded-xl flex flex-col gap-4 border transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full group"
                                    style={{
                                        backgroundColor: "var(--color-surface-container-low)",
                                        borderColor: "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
                                    }}
                                >
                                    <span
                                        className="material-symbols-outlined text-3xl ui-accent transition-transform group-hover:scale-110"
                                    >
                                        {theme.icon}
                                    </span>
                                    <h3
                                        className="text-title-md ui-heading"
                                    >
                                        {theme.title}
                                    </h3>
                                    <p
                                        className="text-body-md ui-copy"
                                    >
                                        {theme.body}
                                    </p>
                                </div>
                            </MotionItem>
                        ))}
                    </MotionStagger>
                </MotionSection>

                {/* ── Quotes ── */}
                <MotionSection
                    className="w-full py-16 md:py-24 surface-secondary"
                >
                    <MotionStagger amount={0.2} className="section-pad max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {quotes.map((q) => (
                            <MotionItem key={q}>
                                <blockquote
                                    className="text-quote-intense italic text-center ui-text-light"
                                >
                                    {q}
                                </blockquote>
                            </MotionItem>
                        ))}
                    </MotionStagger>
                </MotionSection>

                {/* ── Process ── */}
                <MotionSection className="section-pad w-full max-w-[1440px] mx-auto py-16 md:py-28">
                    <MotionText>
                        <h2
                            className="text-headline-lg mb-14 ui-heading"
                        >
                            How the work unfolds
                        </h2>
                    </MotionText>
                    <MotionStagger amount={0.2} className="flex flex-col gap-0">
                        {processSteps.map((step, i) => (
                            <MotionItem key={step.label}>
                                <div
                                    className="flex flex-col md:flex-row gap-6 md:gap-12 items-start py-8 border-t transition-colors duration-300 hover:bg-black/5 rounded-lg px-4 -mx-4"
                                    style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)" }}
                                >
                                    <div
                                        className="text-display-lg font-light w-8 shrink-0 ui-muted"
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3
                                            className="text-headline-sm ui-heading"
                                        >
                                            {step.label}
                                        </h3>
                                        <p
                                            className="text-body-lg max-w-xl ui-copy"
                                        >
                                            {step.body}
                                        </p>
                                    </div>
                                </div>
                            </MotionItem>
                        ))}
                    </MotionStagger>
                </MotionSection>

                {/* ── CTA ── */}
                <MotionSection
                    className="w-full py-16 md:py-24 text-center surface-tertiary"
                >
                    <div className="section-pad max-w-[600px] mx-auto">
                        <MotionText>
                            <h2
                                className="text-display-lg mb-6 ui-tertiary-heading"
                            >
                                You don&apos;t have to hold it all alone.
                            </h2>
                        </MotionText>
                        <MotionReveal delay={0.2}>
                            <p
                                className="text-body-lg mb-10 ui-tertiary-copy"
                            >
                                Whenever you&apos;re ready — even if you&apos;re not quite sure what you need yet —
                                reaching out is enough of a start.
                            </p>
                        </MotionReveal>
                        <MotionReveal delay={0.4}>
                            <Link
                                href="/conversation"
                                className="btn-primary inline-flex btn-wide hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                            >
                                Begin a Conversation
                            </Link>
                        </MotionReveal>
                    </div>
                </MotionSection>
            </main>

        </>
    );
}
