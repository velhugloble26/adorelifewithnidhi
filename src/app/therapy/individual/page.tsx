import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { MotionSection, MotionText, MotionStagger, MotionItem, MotionReveal } from "@/components/ui/Motion";
export const metadata: Metadata = {
    title: "Individual Therapy",
    description:
        "Individual therapy at Adore Life offers a private, compassionate space to understand your thoughts, emotions and patterns, with therapist Nidhi Roy in Thane, India.",
};

const INDIVIDUAL_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB8UhDZOpERUsmQpWtTpZg460gu5ptkmQkFLetcjzxRvEVy-VFeyv45F7iaT_sgiIVCt32Q0BRikzitesQZ7zG4oiQdn_9pEmou3GcI7eED8rU7SQTG8gDXocu1imDYc4-kFWKegmgPiJkddvUeYQpyjqx9BrtLixao7v4Mz1271gc7SYvPJzO08YO3gt3CGvHHHF7vPqDnl7Cxg3tUH6npesl24BZlksxcE8xhyhT97eSRMBxiZ8T2";

const challenges = [
    { icon: "psychology", title: "Anxiety & Overwhelm", body: "When your mind won't quieten, even when life is calm." },
    { icon: "mood_bad", title: "Low Mood or Emptiness", body: "A persistent sense of flatness or disconnection from joy." },
    { icon: "sync_problem", title: "Repeating Patterns", body: "The same stories in different situations, and wondering why." },
    { icon: "self_improvement", title: "Self-Worth & Confidence", body: "Knowing you're capable but still struggling to believe it." },
    { icon: "blur_circular", title: "Emotional Confusion", body: "Feelings you can't quite name or understand." },
    { icon: "transition_slide", title: "Life Transitions", body: "Navigating change, loss, identity shifts or new beginnings." },
];

const processSteps = [
    { label: "Initial Conversation", body: "We begin by understanding what brings you to therapy and what you're hoping to explore." },
    { label: "Exploring Your Story", body: "We look at your experiences, thoughts, emotions and patterns together." },
    { label: "Creating Understanding", body: "We develop clarity about what shapes your inner world and how you navigate it." },
    { label: "Making New Choices", body: "From that understanding, we explore what different ways of thinking, feeling and responding might be possible." },
    { label: "Moving Forward", body: "You leave therapy not just feeling better, but better equipped to understand and navigate yourself." },
];

export default function IndividualTherapyPage() {
    return (
        <>
            <Navbar />

            <main>
                {/* ── Breadcrumb ── */}
                <MotionReveal delay={0.1} amount={0.1}>
                    <nav className="section-pad pt-6 max-w-[1440px] mx-auto" aria-label="Breadcrumb">
                        <ol className="flex gap-2 text-label-md ui-muted">
                            <li><Link href="/therapy" className="ui-muted transition-colors hover:text-[var(--color-soft-teal)]">Therapy</Link></li>
                            <li aria-hidden="true">/</li>
                            <li className="ui-heading">Individual Therapy</li>
                        </ol>
                    </nav>
                </MotionReveal>

                {/* ── Hero ── */}
                <MotionSection className="section-pad pt-12 pb-16 md:pb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-[1440px] mx-auto">
                    <div>
                        <MotionText>
                            <h1 className="text-display-lg mb-6 ui-heading">
                                A space to understand yourself.
                            </h1>
                        </MotionText>
                        <MotionStagger amount={0.2} className="space-y-4 text-body-lg mb-10 ui-copy">
                            <MotionItem>
                                <p>
                                    Individual therapy at Adore Life offers you a private, confidential space to
                                    explore what is happening in your life—without judgement, pressure or
                                    advice you didn't ask for.
                                </p>
                            </MotionItem>
                            <MotionItem>
                                <p>
                                    We work together to understand your thoughts, feelings, patterns and
                                    experiences—so that you can move forward with more clarity, confidence and
                                    emotional freedom.
                                </p>
                            </MotionItem>
                        </MotionStagger>
                        <MotionReveal delay={0.4}>
                            <Link
                                href="/conversation"
                                className="btn-primary inline-flex btn-lg hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                            >
                                Begin a Conversation
                            </Link>
                        </MotionReveal>
                    </div>
                    <MotionReveal delay={0.3} direction="left" amount={0.2}>
                        <div
                            className="aspect-[4/5] rounded-xl overflow-hidden surface-sand group"
                        >
                            <Image
                                src={INDIVIDUAL_IMG}
                                alt="A calm, welcoming individual therapy session"
                                width={1600}
                                height={900}
                                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.15]"
                            />
                        </div>
                    </MotionReveal>
                </MotionSection>

                {/* ── Quote ── */}
                <MotionSection
                    className="py-16 md:py-24 surface-sand"
                >
                    <div className="section-pad max-w-[1440px] mx-auto text-center">
                        <MotionReveal>
                            <blockquote
                                className="text-quote-intense italic max-w-3xl mx-auto ui-heading"
                            >
                                "The aim of individual therapy is not to make you a different person. It is to help you understand yourself well enough that you can choose differently."
                            </blockquote>
                        </MotionReveal>
                    </div>
                </MotionSection>

                {/* ── Challenges ── */}
                <MotionSection className="section-pad py-16 md:py-32 max-w-[1440px] mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <MotionReveal>
                            <div
                                className="inline-flex items-center gap-2 mb-4 text-label-md uppercase tracking-widest ui-muted"
                            >
                                <span
                                    className="w-8 h-px divider-muted"
                                />
                                What We Work With
                            </div>
                        </MotionReveal>
                        <MotionText>
                            <h2 className="text-headline-lg ui-heading">
                                Individual therapy can be helpful for many things.
                            </h2>
                        </MotionText>
                    </div>
                    <MotionStagger amount={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {challenges.map((c) => (
                            <MotionItem key={c.title}>
                                <div
                                    className="p-8 rounded-xl border transition-all duration-300 hover:shadow-md hover:-translate-y-1 ui-card h-full group"
                                >
                                    <span className="material-symbols-outlined text-3xl mb-4 block ui-accent transition-transform group-hover:scale-110">
                                        {c.icon}
                                    </span>
                                    <h3 className="text-headline-md mb-2 ui-heading">
                                        {c.title}
                                    </h3>
                                    <p className="text-body-md ui-copy">
                                        {c.body}
                                    </p>
                                </div>
                            </MotionItem>
                        ))}
                    </MotionStagger>
                </MotionSection>

                {/* ── Process ── */}
                <MotionSection
                    className="py-16 md:py-32 surface-low"
                >
                    <div className="section-pad max-w-[1440px] mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <MotionText>
                                <h2 className="text-headline-lg ui-heading">
                                    How individual therapy works at Adore Life.
                                </h2>
                            </MotionText>
                        </div>
                        <MotionStagger amount={0.2} className="max-w-2xl mx-auto space-y-8">
                            {processSteps.map((step, i) => (
                                <MotionItem key={step.label}>
                                    <div
                                        className="flex gap-6 p-6 rounded-lg relative surface-bright transition-transform duration-300 hover:shadow-md hover:-translate-y-1"
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 surface-accent"
                                        >
                                            <span className="text-white text-sm font-bold">{i + 1}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-headline-md mb-2 ui-heading">
                                                {step.label}
                                            </h3>
                                            <p className="text-body-md ui-copy">
                                                {step.body}
                                            </p>
                                        </div>
                                    </div>
                                </MotionItem>
                            ))}
                        </MotionStagger>
                    </div>
                </MotionSection>

                {/* ── CTA ── */}
                <MotionSection className="section-pad py-16 md:py-32 max-w-[1440px] mx-auto text-center">
                    <MotionText>
                        <h2 className="text-headline-lg mb-6 ui-heading">
                            Ready to begin?
                        </h2>
                    </MotionText>
                    <MotionReveal delay={0.2}>
                        <p className="text-body-lg mb-10 max-w-xl mx-auto ui-copy">
                            You don't need to know exactly what to say. Reach out, and we'll take it from there.
                        </p>
                    </MotionReveal>
                    <MotionReveal delay={0.4}>
                        <Link
                            href="/conversation"
                            className="btn-primary inline-flex btn-lg hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                        >
                            Begin a Conversation
                        </Link>
                    </MotionReveal>
                </MotionSection>
            </main>

        </>
    );
}
