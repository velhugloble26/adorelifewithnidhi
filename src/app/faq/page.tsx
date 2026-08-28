"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";



const FAQ_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB3ytqBAxWGzp11JosVSuFq2vUEAdrUuWOwfNpe_jbDySGeZ8gnz9IctkVpXcd9hQAhA84OEEzUXs7Qcs14fad0sf3cGr51o595e-V7gstVJ3wO3LAr0dYCMV19fKSBhKlW5Krj0HVug7KhWdQYiGiG48yzkL6n5M1Ri9xdS2_oJTh06xCDOMmjcVfQM2UJSlOWpftbjmkWSqO0DjZCIVhCb5ZXDUlE96PEwFzYIQZ730cI6Ix--0gy";

const faqs = [
    {
        category: "About Therapy",
        items: [
            {
                q: "What exactly is therapy?",
                a: "Therapy is a collaborative process between you and a trained professional aimed at helping you navigate life's challenges, understand your feelings, and develop healthier coping mechanisms. It provides a safe, confidential space for self-exploration and growth.",
            },
            {
                q: "How do I know if I need therapy?",
                a: "If you find yourself feeling overwhelmed, experiencing prolonged sadness, struggling with relationships, or unable to cope with daily life, therapy can be beneficial. It's also helpful for those seeking personal growth or a deeper understanding of themselves.",
            },
        ],
    },
    {
        category: "Starting Therapy",
        items: [
            {
                q: "What should I expect in the first session?",
                a: "The first session is primarily about getting to know each other. Your therapist will ask questions about your history, current concerns, and goals for therapy. It's also an opportunity for you to ask questions and see if you feel comfortable with their approach.",
            },
        ],
    },
    {
        category: "The Therapeutic Relationship",
        items: [
            {
                q: "What if I don't click with my therapist?",
                a: "It is completely normal and okay if you don't feel a connection with your first therapist. The therapeutic relationship is crucial to the process. We encourage open communication about this; you are always welcome to request a change, and we will support you in finding the right fit.",
            },
        ],
    },
    {
        category: "Practical Questions",
        items: [
            {
                q: "What are your fees and do you accept insurance?",
                a: "Our standard fee is discussed during the initial consultation. We do not bill insurance directly, but we can provide a receipt for you to claim reimbursement depending on your insurance benefits.",
            },
        ],
    },
];

export default function FAQPage() {
    return (
        <>
            <Navbar />

            <main className="flex-grow flex flex-col items-center w-full">
                {/* ── Hero ── */}
                <section className="w-full max-w-[800px] px-margin-mobile md:px-0 mx-auto mt-16 md:mt-32 mb-16 text-center">
                    <h1 className="text-display-lg mb-6" style={{ color: "var(--color-primary)" }}>
                        You may have questions.<br />
                        <span className="italic" style={{ color: "var(--color-stone-grey)" }}>
                            That's completely okay.
                        </span>
                    </h1>
                    <p className="text-body-lg max-w-2xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
                        Exploring therapy is a significant step. We've gathered some common questions to
                        help bring clarity and peace of mind as you consider beginning this process.
                    </p>
                </section>

                {/* ── Search Bar (Visual) ── */}
                <section className="w-full max-w-[600px] px-margin-mobile md:px-0 mx-auto mb-16 md:mb-32">
                    <div className="relative group">
                        <span
                            className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors"
                            style={{ color: "var(--color-stone-grey)" }}
                        >
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            className="w-full px-12 py-4 ghost-input"
                            style={{ backgroundColor: "var(--color-surface-container-lowest)", paddingLeft: "3rem" }}
                        />
                    </div>
                </section>

                {/* ── FAQ Categories ── */}
                <section className="w-full max-w-[800px] px-margin-mobile md:px-0 mx-auto mb-32 flex flex-col gap-16">
                    {faqs.map((category, catIndex) => (
                        <div key={category.category} className="w-full">
                            <h2
                                className="text-headline-lg mb-8 border-b pb-4"
                                style={{ color: "var(--color-primary)", borderColor: "var(--color-surface-variant)" }}
                            >
                                {category.category}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {category.items.map((item, i) => (
                                    <details
                                        key={i}
                                        className="group border-b pb-4"
                                        style={{ borderColor: "var(--color-surface-variant)" }}
                                    >
                                        <summary
                                            className="flex justify-between items-center py-4 cursor-pointer focus:outline-none"
                                            style={{ color: "var(--color-primary)" }}
                                        >
                                            <span className="text-headline-md" style={{ fontSize: "20px" }}>
                                                {item.q}
                                            </span>
                                            <span
                                                className="material-symbols-outlined faq-icon"
                                                style={{ color: "var(--color-stone-grey)" }}
                                            >
                                                add
                                            </span>
                                        </summary>
                                        <div
                                            className="text-body-md pb-4 pl-2"
                                            style={{ color: "var(--color-on-surface-variant)" }}
                                        >
                                            <p>{item.a}</p>
                                        </div>
                                    </details>
                                ))}
                            </div>
                            {catIndex === 1 && (
                                <div className="w-full my-8">
                                    <div
                                        className="bg-cover bg-center w-full h-[300px] md:h-[400px] rounded-xl"
                                        style={{ backgroundImage: `url(${FAQ_IMG})` }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </section>

                {/* ── CTA ── */}
                <section
                    className="w-full py-16 text-center"
                    style={{ backgroundColor: "var(--color-surface-container-high)" }}
                >
                    <div className="max-w-[600px] mx-auto px-4">
                        <h2 className="text-headline-lg mb-4" style={{ color: "var(--color-primary)" }}>
                            Still seeking clarity?
                        </h2>
                        <p className="text-body-md mb-8" style={{ color: "var(--color-on-surface-variant)" }}>
                            If your question isn't answered here, we invite you to reach out directly. We
                            are here to help you feel completely comfortable before beginning.
                        </p>
                        <Link
                            href="/conversation"
                            className="inline-block font-label-md transition-colors"
                            style={{
                                color: "var(--color-soft-teal)",
                                border: "1px solid var(--color-soft-teal)",
                                paddingTop: "0.75rem",
                                paddingBottom: "0.75rem",
                                paddingLeft: "2rem",
                                paddingRight: "2rem",
                                borderRadius: "0.5rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-soft-teal)";
                                (e.currentTarget as HTMLAnchorElement).style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                                (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-soft-teal)";
                            }}
                        >
                            Ask a Question
                        </Link>
                    </div>
                </section>
            </main>

        </>
    );
}
