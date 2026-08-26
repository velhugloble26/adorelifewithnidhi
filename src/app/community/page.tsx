import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Community & NGO Programmes",
    description:
        "We extend our practice beyond the therapy room, collaborating with communities and NGOs to create safe spaces where transformative dialogue can begin.",
};

const HERO_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA3HgN9o_3LIWOg_w-VPYvsYJUG2Ip8uk_Wqm1tFZ9nW5sxVf3j1M7a041_5FDzLl2WfXGdkCRi-3_9H_BaiR-OphD8m7ZUaxL-i6ugX75JiR6CXa0P3n3X3OiuJ6GX2IVtRAkvO7ZHOVPx2i4-_lkcVZt7bSC2rZKBGGF5mcGcaFzpnxx8smSCVxBscB8eQX_95IIioy8B7fIUjYDYkx9i-qEUCbKdCiIql7d5l5HCr95mcswlTRDq";
const TITLE_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDQruSrKnqijF_8H5LnwovS6kYcwSFoep5B30vU2xB0A9Nzwo2nrBlTw9yg-BmETOG1p4Ap1PAyJqJRupulhPts480AFfKbW8m2SIbM3FI1ltGdV2vH9xshTke4KmAjyP_KDOnRGFBMAP-WOHvxOzII9V4GdElQyaJkluz8JG5JpFQY9t1p1Jmwev66Rvz4tCjNNSbT-OlK7WMqSFjRRwR3BhMaiprfoMpLUTVWRoUvdkjE0ldpSaWyWSnHIW4X2dl8gQ";
const BENTO_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB_-kTDyC6uRuWeYVeHN50k_HoFrQyw41VczCD3pQo6GKhWHPbYWBMIn5c4KANqnCdAGRTcX6pgFvfDS7oPJ-a_1z6wHd3DW7f61LLX87yWlnbMjcOVvQXBoMkv5T0dBnhqxNcfIHb-7AvBk0LdM0ZIYCjpyVVv6vRZPVm-MrkwMXJGkzBM08BM0oOg3a5WgXGVUZB6t1xpr6fD7mBwNOXlF0ECSZ8oFcgLPjR9AihpsWju8SjLK0Ts";

export default function CommunityPage() {
    return (
        <>
            <Navbar />

            <main className="flex-grow flex flex-col items-center w-full">
                {/* ── Hero Section ── */}
                <section className="section-pad w-full max-w-[1440px] pt-16 md:pt-32 pb-16 flex flex-col items-center text-center">
                    <h1 className="text-display-lg max-w-4xl mx-auto leading-tight mb-8" style={{ color: "var(--color-primary)" }}>
                        Understanding should be accessible to everyone.
                    </h1>
                    <div className="mb-8 max-w-md mx-auto">
                        <img src={TITLE_IMG} alt="Because Everyone Deserves To Feel Understood" className="w-full h-auto" />
                    </div>
                    <p className="text-body-lg max-w-2xl mx-auto mb-12" style={{ color: "var(--color-on-surface-variant)" }}>
                        We extend our practice beyond the therapy room, collaborating with communities and
                        NGOs to create safe spaces where transformative dialogue can begin.
                    </p>
                    <div className="w-full aspect-[21/9] rounded-lg overflow-hidden relative" style={{ backgroundColor: "var(--color-surface-container)" }}>
                        <img
                            className="w-full h-full object-cover mix-blend-multiply opacity-90"
                            src={HERO_IMG}
                            alt="A diverse group of women sitting in a loose circle in a supportive conversation."
                        />
                    </div>
                </section>

                {/* ── Why Community Matters ── */}
                <section className="section-pad w-full max-w-[1440px] py-16 md:py-32 flex flex-col md:flex-row gap-16 items-start">
                    <div className="md:w-1/3 md:sticky md:top-32">
                        <h2 className="text-headline-lg mb-4" style={{ color: "var(--color-primary)" }}>Why Community Matters</h2>
                        <div className="w-12 h-px mb-6" style={{ backgroundColor: "var(--color-stone-grey)" }}></div>
                    </div>
                    <div className="md:w-2/3 flex flex-col gap-8 text-body-lg" style={{ color: "var(--color-on-surface-variant)" }}>
                        <p>
                            Healing rarely happens in isolation. The language we use, the spaces we inhabit,
                            and the people we surround ourselves with profoundly shape our capacity to
                            understand ourselves and others.
                        </p>
                        <p>
                            Our community programmes are designed to dismantle the barriers of clinical
                            psychology, translating complex therapeutic concepts into gentle, accessible
                            language. We build "soft invitations" for individuals to begin their journey of
                            self-inquiry within the safety of a shared experience.
                        </p>
                    </div>
                </section>

                {/* ── Programme Themes (Bento Grid) ── */}
                <section className="w-full py-16 md:py-32" style={{ backgroundColor: "var(--color-warm-ivory)" }}>
                    <div className="section-pad max-w-[1440px] mx-auto">
                        <h2 className="text-headline-lg text-center mb-16" style={{ color: "var(--color-primary)" }}>
                            Our Programme Themes
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
                            {/* Card 1 */}
                            <div
                                className="p-10 rounded-lg flex flex-col gap-6 md:col-span-2 aspect-auto md:aspect-[2/1] justify-end relative overflow-hidden group"
                                style={{ backgroundColor: "var(--color-muted-sand)" }}
                            >
                                <div className="absolute inset-0 z-0">
                                    <img
                                        className="w-full h-full object-cover opacity-30 transition-opacity duration-700 group-hover:opacity-40"
                                        src={BENTO_IMG}
                                        alt="Collaborative exercise"
                                    />
                                </div>
                                <div className="relative z-10">
                                    <span className="material-symbols-outlined mb-2 text-3xl" style={{ color: "var(--color-soft-teal)" }}>
                                        forum
                                    </span>
                                    <h3 className="text-headline-md mb-2" style={{ color: "var(--color-primary)" }}>Awareness Talks</h3>
                                    <p className="text-body-md max-w-md" style={{ color: "var(--color-on-surface-variant)" }}>
                                        Gentle, introductory sessions exploring emotional literacy, the power of
                                        boundaries, and the foundations of self-compassion.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div
                                className="p-10 rounded-lg flex flex-col gap-6 justify-between border"
                                style={{ backgroundColor: "var(--color-surface-container-high)", borderColor: "color-mix(in srgb, var(--color-stone-grey) 20%, transparent)" }}
                            >
                                <div>
                                    <span className="material-symbols-outlined mb-4 text-3xl" style={{ color: "var(--color-sage-green)" }}>
                                        psychology_alt
                                    </span>
                                    <h3 className="text-headline-md mb-2" style={{ color: "var(--color-primary)" }}>Interactive Workshops</h3>
                                </div>
                                <p className="text-body-md" style={{ color: "var(--color-on-surface-variant)" }}>
                                    Deep-dive sessions providing practical tools for navigating anxiety, fostering
                                    resilience, and engaging in difficult conversations.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div
                                className="p-10 rounded-lg flex flex-col gap-6 justify-between border"
                                style={{ backgroundColor: "var(--color-tertiary-fixed)", borderColor: "color-mix(in srgb, var(--color-stone-grey) 20%, transparent)" }}
                            >
                                <div>
                                    <span className="material-symbols-outlined mb-4 text-3xl" style={{ color: "var(--color-tertiary)" }}>
                                        nature_people
                                    </span>
                                    <h3 className="text-headline-md mb-2" style={{ color: "var(--color-on-tertiary-fixed)" }}>Youth Programmes</h3>
                                </div>
                                <p className="text-body-md" style={{ color: "var(--color-on-tertiary-fixed-variant)" }}>
                                    Tailored spaces for young people to develop emotional vocabulary and safe
                                    coping mechanisms in a pressured world.
                                </p>
                            </div>

                            {/* Card 4 */}
                            <div
                                className="p-10 rounded-lg flex flex-col gap-6 md:col-span-2 border justify-center items-center text-center"
                                style={{ backgroundColor: "var(--color-surface-container-lowest)", borderColor: "color-mix(in srgb, var(--color-stone-grey) 20%, transparent)" }}
                            >
                                <p className="text-quote-intense max-w-lg italic" style={{ color: "var(--color-secondary)" }}>
                                    "The deepest form of care is offering someone the vocabulary to articulate their own experience."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Who We Work With ── */}
                <section className="section-pad w-full max-w-[1440px] mx-auto py-16 md:py-32 flex flex-col items-center">
                    <h2 className="text-headline-lg mb-12" style={{ color: "var(--color-primary)" }}>Who We Work With</h2>
                    <div className="flex flex-wrap justify-center gap-4 max-w-3xl">
                        {[
                            "Non-Governmental Organisations",
                            "Women's Advocacy Groups",
                            "Educational Institutions",
                            "Community Support Centers",
                            "Corporate Wellness Initiatives",
                        ].map((label) => (
                            <div
                                key={label}
                                className="px-6 py-3 rounded-full text-label-md border"
                                style={{
                                    backgroundColor: "var(--color-surface-container-high)",
                                    color: "var(--color-stone-grey)",
                                    borderColor: "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
                                }}
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Partnership CTA ── */}
                <section
                    className="section-pad w-full py-16 md:py-32 flex flex-col items-center text-center"
                    style={{ backgroundColor: "var(--color-secondary-fixed)" }}
                >
                    <div className="max-w-2xl">
                        <span className="material-symbols-outlined mb-6 text-4xl" style={{ color: "var(--color-on-secondary-fixed-variant)" }}>
                            handshake
                        </span>
                        <h2 className="text-display-lg mb-6" style={{ color: "var(--color-on-secondary-fixed)" }}>
                            Let's build a quieter space, together.
                        </h2>
                        <p className="text-body-lg mb-10" style={{ color: "var(--color-on-secondary-fixed-variant)" }}>
                            If your organisation aligns with our mission to make emotional literacy accessible
                            and compassionate, we would be honoured to start a conversation.
                        </p>
                        <Link
                            href="/conversation"
                            className="btn-primary inline-flex"
                            style={{ paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "2rem", paddingRight: "2rem" }}
                        >
                            Explore a Partnership
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
