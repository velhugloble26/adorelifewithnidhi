"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
    PageHero,
    IconCard,
    SectionHeading,
    CtaSection,
    PullQuote,
} from "@/components/ui";

const pressures = [
    {
        icon: "public",
        iconColor: "var(--color-soft-teal)",
        title: "Digital Pressure",
        body: "Constant connectivity brings comparison, cyberbullying, and the stress of maintaining a curated online identity, impacting self-worth.",
    },
    {
        icon: "groups",
        iconColor: "var(--color-sage-green)",
        title: "Social Dynamics",
        body: "Navigating complex peer relationships, peer pressure, and the crucial desire to belong can be overwhelming and isolating.",
    },
    {
        icon: "school",
        iconColor: "var(--color-stone-grey)",
        title: "Academic Anxiety",
        body: "The intense pressure to perform, succeed, and secure a future path creates chronic stress and fear of failure.",
    },
];

const programmes = [
    {
        title: "Students",
        subtitle: "Building resilience and emotional vocabulary.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBs0KnldiYyjSsc3H558MIGREVbMvWjcCZiPvYCzcVB3_KkSHWFevH2m8WY6p_C4itJko3RYEA4G0Yxd8mot7dbGHah4XRBN19QUe8p33Uq1yClWl4fyrh57J6Vun0WZpXKm5rAoeUU8PagsGscjLDDD6SYtaibb0ex5b8WAr9_PD7E-H8mFvCp6mhY-NGKjmFLUD_ngkg7LmHYWWEyDKP5ehaL-rxwua8b5IHKKQo7eaCl8B-5FNyC",
        alt: "Students in a supportive group conversation",
    },
    {
        title: "Parents",
        subtitle: "Fostering understanding and constructive dialogue.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6oI1CpUTc_JTTUUKOzILPgLNqleaWl6T9wzlGmoVeMXiN2btpvoXrPcJh1PBPq30UR84qSs_1qMQkZuc3bz4SuRXsOCTAwI9jelDYCo7loyhkSkiIET6iYLyuHlRAqWz60iTYHex3FNSJW4--kgNPhpxIboDBoj7yq7ANvXqzqVVCB-aSo_ggzGKPmY-1U35CNP6WT3o1WHoFIZMNe3FjWp8-bi5JKj6JUzF8aiuET_tFtI9KVDDH",
        alt: "Parent and teenager in supportive conversation",
    },
    {
        title: "Teachers",
        subtitle: "Tools for recognising and supporting emotional needs.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9D5l4IClq7RyuEufbGrYNIbCei1GSHCb39qVjGFqC3mPW55He_W1ROyoyg_pGctXyFBRDzJXoW30GSlEJN2-bfSuRmCGy9hvh8VYCfX3u30sl7zH5Ec8ESDq-fFpxB5gD4nC8-E9i8xXquLzF-u-dwKpj7Lfhy2VJucHHp4s-tfP5WpsRrX2ubjqtH_4xa-JEl-SS3Ou0kYVgSc48RkY6H0yP9qdqH-3cvIjXNMO8FWMOziQQcSWZ",
        alt: "Teacher reflecting in a calm classroom",
    },
    {
        title: "Leadership",
        subtitle: "Creating systemic change and a culture of wellbeing.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ82JPE_5aq8yta9wTwr4DkZY71X5I0iSuEAKUimHmFFwWH9ZPvOGeOKLBsY1wg2UVxb0ODAXrgx3GnwUR3L1oZQadJ7N1kWZ7neLgsqaPCAy92378hqoquaJPOZ8Oi5trDbs3BmFPYnaalJMowNPegzZJ8XD65TRoPB-5YPonTTfj5QuYfP_szOcrMRNElvWfDZkvCYHHlG0JVDpLfZs4MaeRIndX5Nu_sRdRdHux2IztLXkvgh5x",
        alt: "School leadership team in collaborative planning",
    },
];

export default function SchoolsPage() {
    return (
        <>
            <Navbar />
            <main className="pt-16">

                {/* ── Hero ── */}
                <PageHero
                    eyebrow="Schools & Colleges"
                    headline="Emotional wellbeing is a life skill."
                    body="Equipping young people, parents, and educators with the tools to navigate the complexities of growing up."
                    centered
                >
                    <Link href="/conversation" className="btn-primary btn-md">
                        Start a Conversation
                    </Link>
                    <Link href="/community" className="btn-secondary btn-md">
                        Community Programmes
                    </Link>
                </PageHero>

                {/* ── Pressures ── */}
                <section
                    className="w-full py-16 md:py-24 surface-lowest"
                >
                    <div className="section-pad w-full max-w-[1440px] mx-auto">
                        <SectionHeading
                            title="The World Young People Are Navigating"
                            body="Growing up has never been simple, but today's youth face an unprecedented landscape of emotional, social, and digital pressures."
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {pressures.map((p) => (
                                <IconCard
                                    key={p.title}
                                    icon={p.icon}
                                    iconColor={p.iconColor}
                                    title={p.title}
                                    body={p.body}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Programmes Bento Grid ── */}
                <section className="section-pad w-full max-w-[1440px] mx-auto py-16 md:py-28">
                    <SectionHeading title="Our Programmes" centered />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {programmes.map((prog) => (
                            <div
                                key={prog.title}
                                className="group relative overflow-hidden rounded-xl"
                                style={{ aspectRatio: "3/4" }}
                            >
                                <img
                                    src={prog.img}
                                    alt={prog.alt}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)" }}
                                />
                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <h3 className="text-headline-sm text-white mb-1">{prog.title}</h3>
                                    <p className="text-body-sm text-white/80 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                        {prog.subtitle}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Pull Quote ── */}
                <PullQuote quote="&ldquo;Emotional literacy is part of learning how to live.&rdquo;" />

                {/* ── CTA ── */}
                <CtaSection
                    icon="school"
                    headline="Ready to support your community?"
                    body="We partner with schools and colleges of all sizes to design programmes that fit your students, your community, and your culture."
                >
                    <Link
                        href="/conversation"
                        className="btn-primary inline-flex items-center gap-2 btn-wide"
                    >
                        Start a Conversation
                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </Link>
                </CtaSection>

            </main>
        </>
    );
}
