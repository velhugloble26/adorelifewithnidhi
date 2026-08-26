import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

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
                <nav className="section-pad pt-6 max-w-[1440px] mx-auto" aria-label="Breadcrumb">
                    <ol className="flex gap-2 text-label-md" style={{ color: "var(--color-stone-grey)" }}>
                        <li><Link href="/therapy" style={{ color: "var(--color-stone-grey)" }}>Therapy</Link></li>
                        <li aria-hidden="true">/</li>
                        <li style={{ color: "var(--color-primary)" }}>Individual Therapy</li>
                    </ol>
                </nav>

                {/* ── Hero ── */}
                <section className="section-pad pt-12 pb-16 md:pb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-[1440px] mx-auto">
                    <div>
                        <h1 className="text-display-lg mb-6" style={{ color: "var(--color-primary)" }}>
                            A space to understand yourself.
                        </h1>
                        <div className="space-y-4 text-body-lg mb-10" style={{ color: "var(--color-on-surface-variant)" }}>
                            <p>
                                Individual therapy at Adore Life offers you a private, confidential space to
                                explore what is happening in your life—without judgement, pressure or
                                advice you didn't ask for.
                            </p>
                            <p>
                                We work together to understand your thoughts, feelings, patterns and
                                experiences—so that you can move forward with more clarity, confidence and
                                emotional freedom.
                            </p>
                        </div>
                        <Link
                            href="/conversation"
                            className="btn-primary inline-flex"
                            style={{ paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "2rem", paddingRight: "2rem" }}
                        >
                            Begin a Conversation
                        </Link>
                    </div>
                    <div
                        className="aspect-[4/5] rounded-xl overflow-hidden"
                        style={{ backgroundColor: "var(--color-muted-sand)" }}
                    >
                        <img
                            src={INDIVIDUAL_IMG}
                            alt="A calm, welcoming individual therapy session"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </section>

                {/* ── Quote ── */}
                <section
                    className="py-16 md:py-24"
                    style={{ backgroundColor: "var(--color-muted-sand)" }}
                >
                    <div className="section-pad max-w-[1440px] mx-auto text-center">
                        <blockquote
                            className="text-quote-intense italic max-w-3xl mx-auto"
                            style={{ color: "var(--color-primary)" }}
                        >
                            "The aim of individual therapy is not to make you a different person. It is to help you understand yourself well enough that you can choose differently."
                        </blockquote>
                    </div>
                </section>

                {/* ── Challenges ── */}
                <section className="section-pad py-16 md:py-32 max-w-[1440px] mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div
                            className="inline-flex items-center gap-2 mb-4 text-label-md uppercase tracking-widest"
                            style={{ color: "var(--color-stone-grey)" }}
                        >
                            <span
                                className="w-8 h-px"
                                style={{ backgroundColor: "var(--color-stone-grey)" }}
                            />
                            What We Work With
                        </div>
                        <h2 className="text-headline-lg" style={{ color: "var(--color-primary)" }}>
                            Individual therapy can be helpful for many things.
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {challenges.map((c) => (
                            <div
                                key={c.title}
                                className="p-8 rounded-xl border transition-shadow duration-300 hover:shadow-md"
                                style={{
                                    backgroundColor: "var(--color-surface)",
                                    borderColor: "var(--color-surface-variant)",
                                }}
                            >
                                <span className="material-symbols-outlined text-3xl mb-4 block" style={{ color: "var(--color-soft-teal)" }}>
                                    {c.icon}
                                </span>
                                <h3 className="text-headline-md mb-2" style={{ color: "var(--color-primary)" }}>
                                    {c.title}
                                </h3>
                                <p className="text-body-md" style={{ color: "var(--color-on-surface-variant)" }}>
                                    {c.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Process ── */}
                <section
                    className="py-16 md:py-32"
                    style={{ backgroundColor: "var(--color-surface-container-low)" }}
                >
                    <div className="section-pad max-w-[1440px] mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-headline-lg" style={{ color: "var(--color-primary)" }}>
                                How individual therapy works at Adore Life.
                            </h2>
                        </div>
                        <div className="max-w-2xl mx-auto space-y-8">
                            {processSteps.map((step, i) => (
                                <div
                                    key={step.label}
                                    className="flex gap-6 p-6 rounded-lg relative"
                                    style={{ backgroundColor: "var(--color-surface-bright)" }}
                                >
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1"
                                        style={{ backgroundColor: "var(--color-soft-teal)" }}
                                    >
                                        <span className="text-white text-sm font-bold">{i + 1}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-headline-md mb-2" style={{ color: "var(--color-primary)" }}>
                                            {step.label}
                                        </h3>
                                        <p className="text-body-md" style={{ color: "var(--color-on-surface-variant)" }}>
                                            {step.body}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="section-pad py-16 md:py-32 max-w-[1440px] mx-auto text-center">
                    <h2 className="text-headline-lg mb-6" style={{ color: "var(--color-primary)" }}>
                        Ready to begin?
                    </h2>
                    <p className="text-body-lg mb-10 max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
                        You don't need to know exactly what to say. Reach out, and we'll take it from there.
                    </p>
                    <Link
                        href="/conversation"
                        className="btn-primary inline-flex"
                        style={{ paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "2rem", paddingRight: "2rem" }}
                    >
                        Begin a Conversation
                    </Link>
                </section>
            </main>

            <Footer />
        </>
    );
}
