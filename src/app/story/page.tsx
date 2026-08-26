"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";



const NIDHI_STORY_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCCOnLdcFrNbe3e983RSqyG9ePacBPhB3At8MKLToJSuUGDQsTceHAS_GyRm2yeuQKeOHtQUrZY94JmWXRR8TsUxVqtIjrXMo3QSN6iZaztCGaFcnVSfFFA7c5wOyzYt43ENBhRKkVbjkTH_YmOLbiQSJGgp6F_fHl2xblmGKEaKTJMcdAvq3rlGqT6E_y9wXol0tFRbiIfeHLL6ZYI7K5pzwL9p2H-RMqcowt_miqi5v40YRdPMiHC";

const values = [
    {
        num: "01",
        title: "Empathy & Compassion",
        body: "Every person deserves to be met with warmth, patience and respect.",
        wide: false,
    },
    {
        num: "02",
        title: "Respect for Individual Journeys",
        body: "There is no universal timeline for healing and no single definition of a meaningful life. We work with where you are, rather than an arbitrary schedule.",
        wide: false,
    },
    {
        num: "03",
        title: "Continuous Learning",
        body: "Psychology continues to evolve. So do I. I remain committed to learning, reflecting and growing as a therapist.",
        wide: false,
    },
    {
        num: "04",
        title: "Independence, Not Dependence",
        body: "Therapy should help you become more capable of understanding and navigating your life—not dependent on therapy forever.",
        wide: true,
        icon: "flight_takeoff",
    },
    {
        num: "05",
        title: "Understanding Before Change",
        body: "Lasting change becomes possible when we understand what lies beneath the patterns we want to change.",
        wide: false,
    },
];

const qualifications = [
    { label: "Qualifications", value: "Masters in Clinical Psychology" },
    { label: "Certifications", value: "Advanced Cognitive Hypnotic Psychotherapist (CHCP), ICHARS" },
    { label: "Experience", value: "Years of navigating complex emotional and relational landscapes" },
    {
        label: "Areas of Work",
        tags: ["Therapy", "Workshops", "Speaking", "Corporate Wellbeing", "Schools & Colleges"],
    },
];

export default function StoryPage() {
    return (
        <>
            <Navbar />

            <main>
                {/* ── Hero ── */}
                <section
                    className="section-pad py-16 md:py-32 max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-6 lg:gap-16"
                >
                    {/* Text */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start">
                        <h1
                            className="text-display-lg mb-6 max-w-2xl"
                            style={{ color: "var(--color-primary)" }}
                        >
                            "Before I became a therapist, I was always curious about people."
                        </h1>
                        <div
                            className="space-y-4 max-w-lg text-body-lg"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            <p>What makes us think the way we do?</p>
                            <p>Why do some experiences stay with us long after they have passed?</p>
                            <p>Why do we sometimes repeat patterns we consciously want to change?</p>
                            <p>And why can two people experience the same situation so differently?</p>
                            <p className="pt-4">
                                These questions gradually became more than a curiosity for me. They became
                                the foundation of my work.
                            </p>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="w-full lg:w-1/2">
                        <div
                            className="aspect-[4/5] w-full rounded overflow-hidden relative group"
                            style={{ backgroundColor: "var(--color-muted-sand)" }}
                        >
                            <div
                                className="absolute inset-0 z-10"
                                style={{
                                    background:
                                        "linear-gradient(to top, color-mix(in srgb, var(--color-primary) 20%, transparent) 0%, transparent 60%)",
                                    mixBlendMode: "multiply",
                                    opacity: 0.5,
                                }}
                            />
                            <img
                                src={NIDHI_STORY_IMG}
                                alt="Nidhi Roy, therapist at Adore Life"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </section>

                {/* ── Why Adore Life Exists ── */}
                <section
                    className="section-pad py-16 md:py-32"
                    style={{ backgroundColor: "var(--color-muted-sand)" }}
                >
                    <div className="max-w-[800px] mx-auto flex flex-col items-center text-center">
                        <h2
                            className="text-headline-lg mb-8"
                            style={{ color: "var(--color-primary)" }}
                        >
                            I believe people are rarely as simple as their problems make them appear.
                        </h2>
                        <div
                            className="text-body-md space-y-6 text-left w-full"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            <p>
                                Over the years, I've met people who came to therapy believing that something
                                was wrong with them. They described themselves as too anxious. Too emotional.
                                Too sensitive. Too dependent. Too angry. Too insecure. Too stuck.
                            </p>
                            <p>
                                But as we began exploring their stories, something else often emerged. Their
                                thoughts, emotions and behaviours had a context. Their patterns had a
                                history. Their reactions had meaning.
                            </p>
                            <p>
                                And underneath what they were struggling with was usually a person trying, in
                                their own way, to cope with something they had experienced, learned or
                                carried for a long time.
                            </p>
                            <blockquote
                                className="text-quote-intense italic pt-4 pb-2 pl-6 ml-2 my-4"
                                style={{
                                    color: "var(--color-primary)",
                                    borderLeft: "1px solid var(--color-stone-grey)",
                                }}
                            >
                                That changed the way I understood therapy. I stopped seeing therapy as a
                                process of fixing what was wrong. I began seeing it as a process of
                                understanding what was there.
                            </blockquote>
                        </div>
                    </div>
                </section>

                {/* ── The Belief ── */}
                <section
                    className="section-pad py-32 md:py-48 flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: "var(--color-warm-ivory)" }}
                >
                    <div
                        className="absolute top-0 right-0 h-full rounded-l-full blur-3xl -z-10"
                        style={{
                            width: "50%",
                            opacity: 0.5,
                            backgroundColor: "var(--color-surface-container)",
                            transform: "translateX(25%)",
                        }}
                    />
                    <div className="max-w-3xl mx-auto text-center">
                        <h2
                            className="text-display-lg mb-12 relative inline-block"
                            style={{ color: "var(--color-primary)" }}
                        >
                            Everyone deserves to be understood.
                            <span
                                className="absolute left-1/2 -translate-x-1/2 w-12 h-px"
                                style={{
                                    bottom: "-1.5rem",
                                    backgroundColor: "var(--color-soft-teal)",
                                }}
                            />
                        </h2>
                        <div
                            className="text-body-lg space-y-4"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            <p>
                                Not just heard. Not simply advised. Not immediately analysed.{" "}
                                <strong style={{ color: "var(--color-primary)" }}>Understood.</strong>
                            </p>
                            <p>
                                To understand someone's story is to look beyond what is visible on the
                                surface. To become curious about what they feel. What they fear. What they
                                have learned. What they protect. What they long for. And what they may not
                                yet have the words to express.
                            </p>
                            <p className="pt-4 font-medium" style={{ color: "var(--color-primary)" }}>
                                That is where I believe meaningful therapy begins.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Philosophy & Approach ── */}
                <section
                    className="section-pad py-16 md:py-32"
                    style={{ backgroundColor: "var(--color-surface-container)" }}
                >
                    <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-16 items-center">
                        {/* Quote circle */}
                        <div className="col-span-1 md:col-span-5 order-2 md:order-1">
                            <div
                                className="aspect-square rounded-full p-8 flex items-center justify-center border relative"
                                style={{
                                    backgroundColor: "var(--color-warm-ivory)",
                                    borderColor: "color-mix(in srgb, var(--color-stone-grey) 20%, transparent)",
                                }}
                            >
                                <div
                                    className="absolute inset-0 rounded-full border"
                                    style={{
                                        borderColor: "color-mix(in srgb, var(--color-stone-grey) 10%, transparent)",
                                        transform: "scale(1.1)",
                                    }}
                                />
                                <p
                                    className="text-quote-intense text-center italic max-w-sm"
                                    style={{ color: "var(--color-primary)" }}
                                >
                                    "The therapy should fit the person, not the person fit the therapy."
                                </p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="col-span-1 md:col-span-6 md:col-start-7 order-1 md:order-2 space-y-6">
                            <span
                                className="text-label-md uppercase tracking-widest"
                                style={{ color: "var(--color-stone-grey)" }}
                            >
                                My Philosophy
                            </span>
                            <h2
                                className="text-headline-lg"
                                style={{ color: "var(--color-primary)" }}
                            >
                                I don't believe there is a single formula for a human being.
                            </h2>
                            <p className="text-body-md" style={{ color: "var(--color-on-surface-variant)" }}>
                                Every person who enters therapy brings a different history, personality,
                                relationship with the world and way of making sense of life. So I don't
                                believe therapy should ask a person to fit into a fixed formula.
                            </p>
                            <p className="text-body-md" style={{ color: "var(--color-on-surface-variant)" }}>
                                Instead, I integrate appropriate evidence-informed psychological approaches
                                according to the individual, their needs and their therapeutic goals. Our work
                                may involve exploring thoughts and behaviours, emotions, relationships,
                                beliefs, past experiences, mindfulness or deeper psychological patterns.
                            </p>
                            <p className="text-body-md font-medium" style={{ color: "var(--color-primary)" }}>
                                But the approach always begins with the person—not the technique.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Values ── */}
                <section
                    className="section-pad py-16 md:py-32"
                    style={{ backgroundColor: "var(--color-warm-ivory)" }}
                >
                    <div className="max-w-[1440px] mx-auto">
                        <div className="mb-12 md:mb-16">
                            <span
                                className="text-label-md uppercase tracking-widest mb-4 block"
                                style={{ color: "var(--color-stone-grey)" }}
                            >
                                My Values
                            </span>
                            <h2
                                className="text-headline-lg max-w-2xl"
                                style={{ color: "var(--color-primary)" }}
                            >
                                The principles that guide my work.
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {values.map((v) => (
                                <div
                                    key={v.num}
                                    className={`p-8 md:p-10 border flex flex-col justify-between group transition-colors duration-300${v.wide ? " lg:col-span-2" : ""}`}
                                    style={{
                                        backgroundColor: "var(--color-surface)",
                                        borderColor: "var(--color-surface-dim)",
                                    }}
                                    onMouseEnter={(e) =>
                                    ((e.currentTarget as HTMLDivElement).style.borderColor =
                                        "var(--color-soft-teal)")
                                    }
                                    onMouseLeave={(e) =>
                                    ((e.currentTarget as HTMLDivElement).style.borderColor =
                                        "var(--color-surface-dim)")
                                    }
                                >
                                    <span
                                        className="text-label-md mb-6 block opacity-50 group-hover:opacity-100 transition-opacity"
                                        style={{ color: "var(--color-stone-grey)" }}
                                    >
                                        {v.num}
                                    </span>
                                    <div className={v.wide ? "flex flex-col md:flex-row gap-6 md:items-end justify-between" : ""}>
                                        <div className={v.wide ? "max-w-md" : ""}>
                                            <h3
                                                className="text-headline-md mb-4"
                                                style={{ color: "var(--color-primary)" }}
                                            >
                                                {v.title}
                                            </h3>
                                            <p className="text-body-md" style={{ color: "var(--color-on-surface-variant)" }}>
                                                {v.body}
                                            </p>
                                        </div>
                                        {v.icon && (
                                            <span
                                                className="material-symbols-outlined hidden md:block"
                                                style={{ color: "var(--color-soft-teal)", fontSize: "2rem", fontWeight: 300 }}
                                            >
                                                {v.icon}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Qualifications ── */}
                <section
                    className="section-pad py-16 border-t"
                    style={{
                        backgroundColor: "var(--color-surface-container-low)",
                        borderColor: "var(--color-surface-dim)",
                    }}
                >
                    <div className="max-w-[800px] mx-auto">
                        <div className="mb-10 text-center">
                            <h2
                                className="text-headline-lg mb-4"
                                style={{ color: "var(--color-primary)" }}
                            >
                                Professional expertise, grounded in human connection.
                            </h2>
                            <p className="text-body-md" style={{ color: "var(--color-on-surface-variant)" }}>
                                Nidhi Roy — Counselling Psychologist | Psychotherapist | Advanced Cognitive
                                Hypnotic Psychotherapist (CHCP)
                            </p>
                        </div>
                        <div className="space-y-4">
                            {qualifications.map((q) => (
                                <div
                                    key={q.label}
                                    className="flex flex-col sm:flex-row sm:items-baseline py-4 border-b"
                                    style={{ borderColor: "var(--color-surface-dim)" }}
                                >
                                    <span
                                        className="w-full sm:w-1/3 text-label-md mb-2 sm:mb-0"
                                        style={{ color: "var(--color-stone-grey)" }}
                                    >
                                        {q.label}
                                    </span>
                                    {q.tags ? (
                                        <div className="w-full sm:w-2/3 flex flex-wrap gap-2">
                                            {q.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 rounded-full border"
                                                    style={{
                                                        backgroundColor: "var(--color-surface)",
                                                        borderColor: "var(--color-surface-dim)",
                                                        color: "var(--color-on-surface-variant)",
                                                        fontSize: "12px",
                                                        fontFamily: "var(--font-label-md)",
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span
                                            className="w-full sm:w-2/3 text-body-md"
                                            style={{ color: "var(--color-primary)" }}
                                        >
                                            {q.value}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Closing CTA ── */}
                <section
                    className="section-pad py-32 text-center flex flex-col items-center"
                    style={{
                        background: `linear-gradient(180deg, var(--color-warm-ivory) 0%, var(--color-muted-sand) 100%)`,
                    }}
                >
                    <h2
                        className="text-display-lg max-w-2xl mb-6"
                        style={{ color: "var(--color-primary)" }}
                    >
                        You don't have to have everything figured out.
                    </h2>
                    <p
                        className="text-body-lg max-w-xl mb-12"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        A first conversation doesn't have to be a commitment to a long therapeutic
                        journey. It can simply be a beginning. A chance to talk. A chance to be heard.
                        A chance to see whether this feels like the right space for you.
                    </p>
                    <Link
                        href="/conversation"
                        className="btn-primary inline-flex shadow-sm hover:shadow-md"
                        style={{ paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "2rem", paddingRight: "2rem" }}
                    >
                        Begin a Conversation
                    </Link>
                    <p
                        className="text-body-md italic mt-6"
                        style={{ color: "var(--color-stone-grey)" }}
                    >
                        Whenever you're ready, we'll begin wherever you are.
                    </p>
                </section>
            </main>

            <Footer />
        </>
    );
}
