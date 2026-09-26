import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { MotionSection, MotionText, MotionStagger, MotionItem, MotionReveal } from "@/components/ui/Motion";
const CORPORATE_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB_nBgI2lDrccJ2yS_VMvcHaIQb6i2yIQU5kRelQZFOhIR65T3SSutggEWZS_KlknduIVoZrAnnasgtf2YZSy5gAjBvmvlMkzhWx5J5T9q5NQjY4nQBdT_AOOC4KN_d4j-IaWJBRG-S8FknAKpcz_NEFHN28Dvpv53jJr1Mt-URQfzay-NKO2OGMV_Dh_5rZ53GxZ2vH5jQbXvAdqnh2Uyc3Ih1nWT11nnF92ndh_HiZJ8uo0eFfXlP";

const challenges = [
    { icon: "battery_0_bar", title: "Burnout", body: "Chronic exhaustion leading to decreased efficacy and personal detachment." },
    { icon: "psychology", title: "Stress", body: "Elevated pressure impacting decision-making and interpersonal dynamics." },
    { icon: "link_off", title: "Disengagement", body: "A gradual withdrawal of discretionary effort and emotional commitment." },
    { icon: "groups", title: "Turnover", body: "The costly loss of valuable talent seeking healthier environments." },
];

export default function CorporateWellbeingPage() {
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
                            <li className="ui-heading">Corporate Wellbeing</li>
                        </ol>
                    </nav>
                </MotionReveal>

                {/* ── Hero ── */}
                <MotionSection className="section-pad py-16 md:py-32 flex flex-col md:flex-row items-center gap-12 max-w-[1440px] mx-auto">
                    <div className="flex-1 space-y-6">
                        <MotionText>
                            <h1 className="text-display-lg ui-heading">
                                Healthier workplaces begin with understanding people.
                            </h1>
                        </MotionText>
                        <MotionReveal delay={0.2}>
                            <p className="text-body-lg max-w-2xl ui-copy">
                                We partner with forward-thinking organisations to cultivate environments where
                                individuals thrive. Emotional safety and resilience are the foundation of
                                sustainable success.
                            </p>
                        </MotionReveal>
                        <MotionReveal delay={0.4} className="pt-4">
                            <Link
                                href="/conversation"
                                className="inline-flex items-center gap-2 text-label-md transition-colors group ui-heading hover:text-[var(--color-soft-teal)]"
                            >
                                Start a Conversation
                                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                                    arrow_forward
                                </span>
                            </Link>
                        </MotionReveal>
                    </div>
                    <MotionReveal delay={0.4} direction="left" className="flex-1 w-full relative">
                        <div
                            className="aspect-[4/3] rounded-lg overflow-hidden surface-sand group"
                        >
                            <Image
                                src={CORPORATE_IMG}
                                alt="A serene, modern office environment with soft natural light."
                                width={1600}
                                height={900}
                                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.15]"
                            />
                        </div>
                    </MotionReveal>
                </MotionSection>

                {/* ── What Organisations Are Seeing ── */}
                <MotionSection
                    className="section-pad py-16 md:py-32 mb-16 md:mb-32 mx-4 md:mx-auto max-w-[1440px] rounded-3xl surface-ivory"
                >
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <MotionText>
                            <h2 className="text-headline-lg mb-4 ui-heading">
                                What organisations are often seeing
                            </h2>
                        </MotionText>
                        <MotionReveal delay={0.2}>
                            <p className="text-body-md ui-copy">
                                The modern workplace demands more than just output. When emotional wellbeing
                                is overlooked, the signs become visible across the organisation.
                            </p>
                        </MotionReveal>
                    </div>
                    <MotionStagger amount={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {challenges.map((c) => (
                            <MotionItem key={c.title}>
                                <div
                                    className="p-8 rounded-lg flex flex-col items-start gap-4 transition-all duration-500 hover:shadow-md hover:-translate-y-1 hover:bg-[var(--color-muted-sand)] surface-base group h-full"
                                >
                                    <div
                                        className="p-3 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                                        style={{
                                            backgroundColor: "var(--color-secondary-fixed)",
                                            color: "var(--color-secondary)",
                                        }}
                                    >
                                        <span className="material-symbols-outlined">{c.icon}</span>
                                    </div>
                                    <h3 className="text-headline-md ui-heading">
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
            </main>

        </>
    );
}
