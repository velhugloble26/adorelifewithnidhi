import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { MotionSection, MotionText, MotionStagger, MotionItem, MotionReveal } from "@/components/ui/Motion";

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
                <MotionReveal delay={0.1} amount={0.1}>
                    <nav className="section-pad pt-6 max-w-[1440px] mx-auto" aria-label="Breadcrumb">
                        <ol className="flex gap-2 text-label-md ui-muted">
                            <li><Link href="/therapy" className="ui-muted transition-colors hover:text-[var(--color-soft-teal)]">Therapy</Link></li>
                            <li aria-hidden="true">/</li>
                            <li className="ui-heading">Couples Therapy</li>
                        </ol>
                    </nav>
                </MotionReveal>

                {/* ── Hero ── */}
                <MotionSection className="section-pad pt-12 pb-16 md:pb-32 max-w-[1440px] mx-auto text-center">
                    <MotionText>
                        <h1 className="text-display-lg mb-6 max-w-3xl mx-auto ui-heading">
                            A healthier relationship begins with understanding.
                        </h1>
                    </MotionText>
                    <MotionStagger amount={0.2} className="space-y-4 text-body-lg max-w-2xl mx-auto mb-12 ui-copy">
                        <MotionItem>
                            <p>
                                Couples therapy at Adore Life is not about deciding who is right or wrong. It is about creating a space
                                where both partners can be heard, understood and can begin to understand each other more clearly.
                            </p>
                        </MotionItem>
                        <MotionItem>
                            <p>
                                Many couples come to therapy not because they have stopped caring, but because they have lost the ability to
                                communicate what they feel, need or want.
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
                </MotionSection>

                {/* ── Challenges ── */}
                <MotionSection
                    className="py-16 md:py-32 surface-low"
                >
                    <div className="section-pad max-w-[1440px] mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <MotionText>
                                <h2 className="text-headline-lg ui-heading">
                                    What brings couples to therapy?
                                </h2>
                            </MotionText>
                        </div>
                        <MotionStagger amount={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {challenges.map((c) => (
                                <MotionItem key={c.title}>
                                    <div
                                        className="p-8 rounded-xl border ui-card transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full group"
                                    >
                                        <span className="material-symbols-outlined text-3xl mb-4 block ui-accent transition-transform group-hover:scale-110">
                                            {c.icon}
                                        </span>
                                        <h3 className="text-headline-md mb-2 ui-heading">{c.title}</h3>
                                        <p className="text-body-md ui-copy">{c.body}</p>
                                    </div>
                                </MotionItem>
                            ))}
                        </MotionStagger>
                    </div>
                </MotionSection>

                {/* ── Process ── */}
                <MotionSection className="section-pad py-16 md:py-32 max-w-[1440px] mx-auto">
                    <div className="max-w-3xl mx-auto">
                        <MotionText>
                            <h2 className="text-headline-lg text-center mb-16 ui-heading">
                                How couples therapy works at Adore Life.
                            </h2>
                        </MotionText>
                        <MotionStagger amount={0.2} className="space-y-8">
                            {processSteps.map((step, i) => (
                                <MotionItem key={step.label}>
                                    <div className="flex gap-6 p-6 rounded-lg surface-ivory transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1"
                                            style={{ backgroundColor: "var(--color-sage-green)" }}
                                        >
                                            <span className="text-white text-sm font-bold">{i + 1}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-headline-md mb-2 ui-heading">{step.label}</h3>
                                            <p className="text-body-md ui-copy">{step.body}</p>
                                        </div>
                                    </div>
                                </MotionItem>
                            ))}
                        </MotionStagger>
                    </div>
                </MotionSection>

                {/* ── CTA ── */}
                <MotionSection
                    className="py-16 md:py-32 text-center surface-sand"
                >
                    <div className="section-pad max-w-[1440px] mx-auto">
                        <MotionText>
                            <h2 className="text-headline-lg mb-6 max-w-2xl mx-auto ui-heading">
                                You don't have to be in crisis to seek couples therapy.
                            </h2>
                        </MotionText>
                        <MotionReveal delay={0.2}>
                            <p className="text-body-lg mb-10 max-w-xl mx-auto ui-copy">
                                Some couples come when they're struggling. Others come when they want to strengthen what they already have.
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
                    </div>
                </MotionSection>
            </main>

        </>
    );
}
