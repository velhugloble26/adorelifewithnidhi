import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Couples Therapy",
    description:
        "Couples therapy at Adore Life — not about deciding who is right, but about understanding each other more deeply and building a healthier relationship.",
};

const challenges = [
    { icon: "forum", title: "Communication breakdown", body: "Conversations that turn into conflicts, or silence that grows between you." },
    { icon: "handshake", title: "Trust difficulties", body: "Whether recovering from betrayal or learning to trust more fully." },
    { icon: "front_hand", title: "Boundary difficulties", body: "Uncertainty about roles, needs and expectations within the relationship." },
    { icon: "loop", title: "Repeating conflict patterns", body: "The same arguments, different occasions—and no resolution." },
    { icon: "heart_broken", title: "Emotional disconnection", body: "Living together but feeling far apart." },
    { icon: "change_circle", title: "Life transitions together", body: "Navigating parenthood, moving, career changes, loss as a couple." },
];

const processSteps = [
    { label: "Creating Safety", body: "We establish a space where both partners can speak honestly without fear of judgement." },
    { label: "Understanding Each Other", body: "We explore how each partner thinks, feels and experiences the relationship." },
    { label: "Identifying Patterns", body: "We look at the dynamics, triggers and cycles that have developed between you." },
    { label: "Building New Ways of Relating", body: "We work together on communication, understanding and connection." },
    { label: "Moving Forward Together", body: "With greater clarity and connection, you can navigate your relationship more consciously." },
];

export default function CouplesTherapyPage() {
    return (
        <>
            <Navbar />

            <main>
                {/* ── Breadcrumb ── */}
                <nav className="section-pad pt-6 max-w-[1440px] mx-auto" aria-label="Breadcrumb">
                    <ol className="flex gap-2 text-label-md" style={{ color: "var(--color-stone-grey)" }}>
                        <li><Link href="/therapy" style={{ color: "var(--color-stone-grey)" }}>Therapy</Link></li>
                        <li aria-hidden="true">/</li>
                        <li style={{ color: "var(--color-primary)" }}>Couples Therapy</li>
                    </ol>
                </nav>

                {/* ── Hero ── */}
                <section className="section-pad pt-12 pb-16 md:pb-32 max-w-[1440px] mx-auto text-center">
                    <h1 className="text-display-lg mb-6 max-w-3xl mx-auto" style={{ color: "var(--color-primary)" }}>
                        A healthier relationship begins with understanding.
                    </h1>
                    <div className="space-y-4 text-body-lg max-w-2xl mx-auto mb-12" style={{ color: "var(--color-on-surface-variant)" }}>
                        <p>
                            Couples therapy at Adore Life is not about deciding who is right or wrong. It is about creating a space
                            where both partners can be heard, understood and can begin to understand each other more clearly.
                        </p>
                        <p>
                            Many couples come to therapy not because they have stopped caring, but because they have lost the ability to
                            communicate what they feel, need or want.
                        </p>
                    </div>
                    <Link
                        href="/conversation"
                        className="btn-primary inline-flex"
                        style={{ paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "2rem", paddingRight: "2rem" }}
                    >
                        Begin a Conversation
                    </Link>
                </section>

                {/* ── Challenges ── */}
                <section
                    className="py-16 md:py-32"
                    style={{ backgroundColor: "var(--color-surface-container-low)" }}
                >
                    <div className="section-pad max-w-[1440px] mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-headline-lg" style={{ color: "var(--color-primary)" }}>
                                What brings couples to therapy?
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {challenges.map((c) => (
                                <div
                                    key={c.title}
                                    className="p-8 rounded-xl border"
                                    style={{
                                        backgroundColor: "var(--color-surface)",
                                        borderColor: "var(--color-surface-variant)",
                                    }}
                                >
                                    <span className="material-symbols-outlined text-3xl mb-4 block" style={{ color: "var(--color-soft-teal)" }}>
                                        {c.icon}
                                    </span>
                                    <h3 className="text-headline-md mb-2" style={{ color: "var(--color-primary)" }}>{c.title}</h3>
                                    <p className="text-body-md" style={{ color: "var(--color-on-surface-variant)" }}>{c.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Process ── */}
                <section className="section-pad py-16 md:py-32 max-w-[1440px] mx-auto">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-headline-lg text-center mb-16" style={{ color: "var(--color-primary)" }}>
                            How couples therapy works at Adore Life.
                        </h2>
                        <div className="space-y-8">
                            {processSteps.map((step, i) => (
                                <div key={step.label} className="flex gap-6 p-6 rounded-lg" style={{ backgroundColor: "var(--color-warm-ivory)" }}>
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1"
                                        style={{ backgroundColor: "var(--color-sage-green)" }}
                                    >
                                        <span className="text-white text-sm font-bold">{i + 1}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-headline-md mb-2" style={{ color: "var(--color-primary)" }}>{step.label}</h3>
                                        <p className="text-body-md" style={{ color: "var(--color-on-surface-variant)" }}>{step.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section
                    className="py-16 md:py-32 text-center"
                    style={{ backgroundColor: "var(--color-muted-sand)" }}
                >
                    <div className="section-pad max-w-[1440px] mx-auto">
                        <h2 className="text-headline-lg mb-6 max-w-2xl mx-auto" style={{ color: "var(--color-primary)" }}>
                            You don't have to be in crisis to seek couples therapy.
                        </h2>
                        <p className="text-body-lg mb-10 max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
                            Some couples come when they're struggling. Others come when they want to strengthen what they already have.
                        </p>
                        <Link
                            href="/conversation"
                            className="btn-primary inline-flex"
                            style={{ paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "2rem", paddingRight: "2rem" }}
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
