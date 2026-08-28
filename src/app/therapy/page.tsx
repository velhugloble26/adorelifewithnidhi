import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Understanding Therapy",
    description:
        "Learn what therapy is, what it isn't, and how the Adore Life Journey can help you move from feeling understood to experiencing emotional freedom.",
};

const THERAPY_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAN0gCWzhDBqHZMR_Cd32rUJa9dgB2wGBFtqYCQkkX3Um3zztRAgIQp2STXl7LJv0eaKdwMABKVbqZ7Lh1PD0fPtp2o4kJ-BFA8Mg1Xc1DqQcg2etZXUEydNQgbI3wyanYgrYUIwfg5YJbEGUnTODirMfNXttXe4IRMEFK_lcPKhlftPMStr__-ifj8g0T-R7kV2yDjJybEFHsiRDDh9CDGLL48zgieiE4nWlErYK_O_D4xT6KMhiAL";

const JOURNEY_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCBu_wjaIDSQDu0SXwN_tOVyxRkIioUHt7o8JrS5jP8Fms9LTQmvu84baGtxz8Helk7zEU-2EinagwNu3ECKGOiD0NZ6jacK7JELrGRaNPofPpizE_CTQVwr8MRA_cjnf3yO-e-Fk6utBJxUwx89mbDcx7EsINebPMTWHlHG2q1sOg0GdyI8qw25PpOxYRQU_rSZ0afGDgcz4gwPLEuqPlQLA7yDixIBfZrnCGp8rhFqlrXTGX9Ivfr";

const therapyFor = [
    {
        title: "Within Yourself",
        items: [
            "Anxiety", "Overthinking", "Self-doubt", "Low self-worth",
            "Emotional exhaustion", "Stress", "Burnout", "Difficulty managing emotions",
        ],
    },
    {
        title: "In Your Relationships",
        items: [
            "Communication difficulties", "Conflict", "Trust issues",
            "Difficulty setting boundaries", "Repeated relationship patterns", "Emotional disconnection",
        ],
    },
    {
        title: "During Life Changes",
        items: [
            "Grief", "Loss", "Separation", "Career changes",
            "Major transitions", "Identity questions", "Becoming a parent",
        ],
    },
];

const journeySteps = [
    { num: 1, title: "Feel Understood", body: "A space where your experiences can be heard without judgement." },
    { num: 2, title: "Understand Yourself", body: "Recognise your thoughts, emotions, beliefs and patterns." },
    { num: 3, title: "Create Awareness", body: "Notice what once felt automatic." },
    { num: 4, title: "Make New Choices", body: "Explore healthier ways of responding and relating." },
    { num: 5, title: "Experience Emotional Freedom", body: "Develop greater flexibility, clarity and confidence in navigating life." },
];

const faqItems = [
    {
        q: "I've never been to therapy before. Is that okay?",
        a: "Absolutely. You don't need previous experience with therapy. We begin wherever you are.",
    },
    {
        q: "What if I don't know what to talk about?",
        a: "That's okay too. You don't need to arrive with a prepared agenda. We can begin with whatever feels most important to you.",
    },
    {
        q: "Will you tell me what to do?",
        a: "Therapy isn't about prescribing solutions for your life. We work together to understand your situation and explore choices that may be right for you.",
    },
    {
        q: "How many sessions will I need?",
        a: "There is no universal answer. The duration depends on your needs, goals and progress, and is reviewed as the work develops.",
    },
    {
        q: "What if I'm not sure therapy is right for me?",
        a: "You don't have to be certain before reaching out. A first conversation can help you understand whether therapy feels appropriate and whether Adore Life feels like the right space for you.",
    },
];

export default function TherapyPage() {
    return (
        <>
            <Navbar />

            <main>
                {/* ── Hero ── */}
                <section
                    className="section-pad py-16 md:py-32 flex flex-col items-center justify-center text-center max-w-[1440px] mx-auto"
                >
                    <h1
                        className="text-display-lg max-w-3xl mb-8 ui-heading"
                    >
                        What if therapy begins with understanding?
                    </h1>
                    <div
                        className="max-w-2xl text-body-lg space-y-6 mb-12 ui-copy"
                    >
                        <p>You don't need to arrive with a diagnosis.</p>
                        <p>You don't need to know exactly what is wrong.</p>
                        <p>And you don't need to have the right words.</p>
                        <p>
                            Therapy begins with a conversation—about what you're experiencing, what has
                            brought you here, and what you hope might become different.
                        </p>
                    </div>
                    <Link
                        href="/conversation"
                        className="btn-primary inline-flex btn-lg"
                    >
                        Begin a Conversation
                    </Link>
                </section>

                {/* ── Image break ── */}
                <section className="section-pad max-w-[1440px] mx-auto mb-16 md:mb-32">
                    <div
                        className="w-full rounded-xl overflow-hidden"
                        style={{ backgroundColor: "var(--color-surface-variant)", aspectRatio: "21 / 9" }}
                    >
                        <img
                            src={THERAPY_IMG}
                            alt="A serene, light-filled therapy space"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </section>

                {/* ── What is therapy ── */}
                <section className="section-pad py-16 max-w-[1440px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-5 md:pr-12">
                            <h2
                                className="text-headline-lg md:sticky"
                                style={{ color: "var(--color-primary)", top: "8rem" }}
                            >
                                Therapy is a space to understand what is happening within you.
                            </h2>
                        </div>
                        <div
                            className="md:col-span-7 text-body-lg space-y-6 ui-copy"
                        >
                            <p>Life can leave us carrying thoughts, emotions and patterns that we don't always understand.</p>
                            <p>Sometimes we know what we're feeling. Sometimes we only know that something doesn't feel right.</p>
                            <p>
                                Therapy creates a confidential, professional space to slow down and explore those experiences
                                with curiosity and compassion. Together, we can begin to understand:
                            </p>
                            <ul className="space-y-4 py-6 pl-9">
                                {[
                                    "What you're experiencing",
                                    "What may be contributing to it",
                                    "How your thoughts, emotions and behaviours connect",
                                    "Why certain situations affect you in particular ways",
                                    "What patterns may be repeating",
                                    "What choices may be available to you",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="relative"
                                        style={{
                                            listStyle: "none",
                                        }}
                                    >
                                        <span
                                            className="absolute font-bold"
                                            style={{ left: "-1.5rem", color: "var(--color-stone-grey)" }}
                                        >
                                            ·
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p
                                className="text-headline-md mt-8 ui-heading"
                            >
                                Therapy isn't about finding fault. It's about finding understanding.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── What therapy is NOT ── */}
                <section
                    className="py-16 md:py-32 my-16 md:my-32 surface-sand"
                >
                    <div className="section-pad max-w-[1440px] mx-auto text-center max-w-4xl">
                        <h2
                            className="text-headline-lg mb-8 ui-heading"
                        >
                            Therapy isn't someone telling you how to live.
                        </h2>
                        <div
                            className="text-body-lg space-y-4 mb-12"
                            style={{ color: "var(--color-tertiary-container)" }}
                        >
                            <p>
                                It isn't a lecture. It isn't a list of instructions. It isn't about being
                                told to "think positive." It isn't about judging your choices. And it isn't
                                about making you dependent on therapy.
                            </p>
                            <p>
                                Therapy is a collaborative process. You remain the expert on your own life.
                                My role is to bring professional psychological understanding, curiosity and
                                perspective to help you explore what may be difficult to see on your own.
                            </p>
                        </div>
                        <blockquote
                            className="text-quote-intense border-l-2 pl-8 py-2 mx-auto text-left max-w-2xl italic"
                            style={{
                                color: "var(--color-primary)",
                                borderColor: "var(--color-stone-grey)",
                            }}
                        >
                            "You don't need someone to tell you who to be. You need space to understand who you are."
                        </blockquote>
                    </div>
                </section>

                {/* ── Who therapy is for ── */}
                <section className="section-pad py-16 max-w-[1440px] mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2
                            className="text-headline-lg mb-6 ui-heading"
                        >
                            You don't have to be in crisis to seek therapy.
                        </h2>
                        <p className="text-body-lg ui-copy">
                            Therapy can be useful whenever something in your emotional life, relationships
                            or way of coping feels difficult, confusing or stuck. You might be experiencing:
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {therapyFor.map((group) => (
                            <div
                                key={group.title}
                                className="p-8 rounded-xl surface-ivory"
                            >
                                <h3
                                    className="text-headline-md mb-6 pb-4 border-b"
                                    style={{
                                        color: "var(--color-primary)",
                                        borderColor: "var(--color-stone-grey)",
                                    }}
                                >
                                    {group.title}
                                </h3>
                                <ul
                                    className="space-y-4 text-body-md ui-copy"
                                >
                                    {group.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 text-center">
                        <p className="text-body-lg mb-2 ui-copy">
                            Or perhaps you simply have a sense that:
                        </p>
                        <p className="text-headline-md mb-4 ui-heading">
                            "I don't feel like myself anymore."
                        </p>
                        <p className="text-body-md ui-muted">
                            You don't need a perfect reason to begin.
                        </p>
                    </div>
                </section>

                {/* ── Journey steps ── */}
                <section
                    className="section-pad py-16 md:py-32 max-w-[1440px] mx-auto border-t mt-16 border-surface"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <span
                                className="text-label-md uppercase tracking-widest mb-4 block ui-muted"
                            >
                                The Adore Life Journey™
                            </span>
                            <h2
                                className="text-headline-lg mb-6 ui-heading"
                            >
                                From feeling understood to experiencing emotional freedom.
                            </h2>
                            <p
                                className="text-body-lg mb-12 max-w-lg ui-copy"
                            >
                                There is no fixed timeline or formula for therapy. But the journey often
                                involves moving through several layers of understanding.
                            </p>

                            <div
                                className="space-y-8 relative pl-8"
                                style={{
                                    borderLeft: "1px solid color-mix(in srgb, var(--color-stone-grey) 30%, transparent)",
                                }}
                            >
                                {journeySteps.map((step) => (
                                    <div key={step.num} className="relative flex items-start gap-6">
                                        <div
                                            className="flex items-center justify-center w-6 h-6 rounded-full text-white z-10 shrink-0 shadow-sm absolute -left-11 surface-accent"
                                        >
                                            <span
                                                className="text-label-md"
                                                style={{ fontSize: "10px" }}
                                            >
                                                {step.num}
                                            </span>
                                        </div>
                                        <div>
                                            <h4
                                                className="text-headline-md mb-2 ui-heading"
                                            >
                                                {step.title}
                                            </h4>
                                            <p className="text-body-md ui-copy">
                                                {step.body}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Illustration */}
                        <div
                            className="hidden lg:block w-full h-full rounded-xl overflow-hidden"
                            style={{ backgroundColor: "var(--color-surface-variant)", minHeight: "500px" }}
                        >
                            <img
                                src={JOURNEY_IMG}
                                alt="Abstract representation of the healing journey"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-headline-md ui-heading">
                            The goal isn't to become someone else. It is to become more fully yourself.
                        </p>
                    </div>
                </section>

                {/* ── FAQ ── */}
                <section
                    className="section-pad py-16 max-w-[1440px] mx-auto surface-lowest"
                >
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2
                                className="text-headline-lg mb-4 ui-heading"
                            >
                                Questions you may be wondering about.
                            </h2>
                            <p className="text-body-lg ui-muted">
                                It's completely okay if you're not sure how this works.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {faqItems.map((item, i) => (
                                <details
                                    key={i}
                                    className="group border-b pb-4 border-surface"
                                    {...(i === 0 ? { open: true } : {})}
                                >
                                    <summary
                                        className="flex justify-between items-center py-4 cursor-pointer focus:outline-none ui-heading"
                                    >
                                        <span className="text-headline-md text-question">
                                            {item.q}
                                        </span>
                                        <span
                                            className="material-symbols-outlined faq-icon ui-muted"
                                        >
                                            add
                                        </span>
                                    </summary>
                                    <div
                                        className="text-body-md pb-4 pl-2 ui-copy"
                                    >
                                        <p>{item.a}</p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Final CTA ── */}
                <section
                    id="contact"
                    className="section-pad py-16 md:py-32 flex flex-col items-center justify-center text-center max-w-[1440px] mx-auto my-16 md:my-32"
                >
                    <h2
                        className="text-headline-lg max-w-2xl mb-8 ui-heading"
                    >
                        You don't need to know exactly what you need.
                    </h2>
                    <div
                        className="max-w-xl text-body-lg space-y-6 mb-12 ui-copy"
                    >
                        <p>
                            Sometimes the first step is simply saying:
                            <br />
                            <strong
                                className="text-headline-md mt-2 block ui-heading"
                            >
                                "Something isn't feeling right, and I want to understand why."
                            </strong>
                        </p>
                        <p>That's enough to begin.</p>
                    </div>
                    <div className="flex flex-col items-center gap-6">
                        <Link
                            href="/conversation"
                            className="btn-primary inline-flex btn-lg"
                        >
                            Begin a Conversation
                        </Link>
                        <span
                            className="text-body-md italic ui-muted"
                        >
                            Whenever you're ready, we'll begin wherever you are.
                        </span>
                    </div>
                </section>
            </main>

        </>
    );
}
