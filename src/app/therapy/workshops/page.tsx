"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";



const WORKSHOP_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD58c8ugdJjlfNdwguwbXu8Te06JIDXGhkCKXkuqUR7Nc-_2z7uoFnW9C-DL-95U8JTMeygsW1W953UcrEUNRjgdzKSI2ZIqT3N5X1TVRUAlrgXhbstZ5r76oEsHrVkQMaewzwhFJRYrCCi6waDxztkVo8Yen0l4Vi3KxDqsatIPoTvj2ItirQfl7l8H5tnRg-B-m2Wrn9A87MN2jLLsu9_gG0gLJ8I-4XcebdTlFl2S3Brr-tsYHlE";

export default function WorkshopsPage() {
    return (
        <>
            <Navbar />

            <main className="pt-16">
                {/* ── Breadcrumb ── */}
                <nav className="section-pad max-w-[1440px] mx-auto mb-8" aria-label="Breadcrumb">
                    <ol className="flex gap-2 text-label-md" style={{ color: "var(--color-stone-grey)" }}>
                        <li><Link href="/therapy" style={{ color: "var(--color-stone-grey)" }}>Therapy</Link></li>
                        <li aria-hidden="true">/</li>
                        <li style={{ color: "var(--color-primary)" }}>Workshops & Webinars</li>
                    </ol>
                </nav>

                {/* ── Hero Section ── */}
                <section className="section-pad py-16 max-w-[1440px] mx-auto text-center md:text-left">
                    <div className="max-w-[800px] mx-auto md:mx-0">
                        <h1 className="text-display-lg mb-6" style={{ color: "var(--color-primary)" }}>
                            Conversations that help us understand ourselves—and each other.
                        </h1>
                        <p className="text-body-lg mb-12" style={{ color: "var(--color-on-surface-variant)" }}>
                            Bringing the insights of clinical psychology into practical, everyday contexts for
                            teams, communities, and individuals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                href="/conversation"
                                className="btn-primary"
                                style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                            >
                                Enquire About a Programme
                            </Link>
                            <Link
                                href="#formats"
                                className="inline-flex items-center justify-center font-label-md transition-colors"
                                style={{
                                    color: "var(--color-primary)",
                                    border: "1px solid var(--color-stone-grey)",
                                    paddingTop: "1rem",
                                    paddingBottom: "1rem",
                                    paddingLeft: "2rem",
                                    paddingRight: "2rem",
                                    borderRadius: "0.5rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                }}
                                onMouseEnter={(e) =>
                                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-surface-container-low)")
                                }
                                onMouseLeave={(e) =>
                                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent")
                                }
                            >
                                View Formats
                            </Link>
                        </div>
                    </div>

                    <div className="mt-16 w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden relative">
                        <div
                            className="bg-cover bg-center w-full h-full"
                            style={{ backgroundImage: `url(${WORKSHOP_IMG})` }}
                            aria-label="A warm, collaborative workshop space"
                        />
                    </div>
                </section>

                {/* ── Why Workshops Section ── */}
                <section
                    className="py-16 md:py-32"
                    style={{ backgroundColor: "var(--color-surface-container-low)" }}
                >
                    <div className="section-pad max-w-[1440px] mx-auto">
                        <div className="max-w-[800px] mx-auto text-center">
                            <span
                                className="text-label-md uppercase tracking-wider block mb-4"
                                style={{ color: "var(--color-sage-green)" }}
                            >
                                The Principle
                            </span>
                            <h2 className="text-headline-lg mb-8" style={{ color: "var(--color-primary)" }}>
                                Making Psychology Practical
                            </h2>
                            <p className="text-body-lg" style={{ color: "var(--color-on-surface-variant)" }}>
                                Therapy is deeply personal, but many of the tools for emotional wellbeing can be
                                learned and shared in community. Workshops and webinars bridge the gap between
                                clinical insight and everyday application, creating spaces where groups can explore
                                complex themes safely and constructively.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
