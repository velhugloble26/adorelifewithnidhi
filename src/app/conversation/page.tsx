"use client";

import Navbar from "@/components/Navbar";



export default function ConversationPage() {
    return (
        <>
            <Navbar />

            <main className="flex-grow flex flex-col items-center w-full max-w-[1440px] mx-auto mt-[-40px]">
                {/* ── Hero ── */}
                <section className="section-pad pt-16 md:pt-32 pb-16 flex flex-col text-center max-w-4xl mx-auto w-full">
                    <h1 className="text-display-lg mb-8 ui-heading">
                        You don't have to know where to begin.
                    </h1>
                    <div className="space-y-4 text-body-lg ui-copy">
                        <p>You may have spent days, months or even years trying to understand what you're experiencing.</p>
                        <p>You may know exactly what you want help with. Or you may simply know that something doesn't feel right anymore.</p>
                        <p>You don't need to have all the answers before reaching out. We can begin by understanding where you are.</p>
                    </div>
                </section>

                {/* ── Form + Details ── */}
                <section className="section-pad pb-16 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start w-full">
                    {/* Form card */}
                    <div
                        className="col-span-1 lg:col-span-7 rounded-xl p-6 md:p-12 relative overflow-hidden group surface-base"
                    >
                        {/* Decorative blob */}
                        <div
                            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-transform duration-1000 group-hover:scale-110"
                            style={{ backgroundColor: "color-mix(in srgb, var(--color-soft-teal) 5%, transparent)" }}
                        />

                        <div className="mb-10 relative z-10">
                            <h2 className="text-headline-lg mb-3 ui-heading">
                                Tell us a little about yourself.
                            </h2>
                            <p className="text-body-md ui-copy">
                                You don't need to tell us your entire story here. Just share enough for us to understand how we can begin.
                            </p>
                        </div>

                        <form action="#" method="POST" className="space-y-8 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Name */}
                                <div className="flex flex-col relative group/field">
                                    <label
                                        htmlFor="name"
                                        className="text-label-md mb-1 transition-colors ui-muted"
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="How should we address you?"
                                        className="ghost-input"
                                    />
                                </div>
                                {/* Phone */}
                                <div className="flex flex-col relative group/field">
                                    <label
                                        htmlFor="phone"
                                        className="text-label-md mb-1 transition-colors ui-muted"
                                    >
                                        Phone / WhatsApp
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        placeholder="Best number to reach you"
                                        className="ghost-input"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex flex-col relative group/field">
                                <label
                                    htmlFor="email"
                                    className="text-label-md mb-1 ui-muted"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Where should we send details?"
                                    className="ghost-input"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Session type */}
                                <div className="flex flex-col relative group/field">
                                    <label
                                        htmlFor="session"
                                        className="text-label-md mb-1 ui-muted"
                                    >
                                        Preferred Session
                                    </label>
                                    <div className="relative">
                                        <select id="session" name="session" className="ghost-input pr-8 w-full">
                                            <option value="" disabled selected>Select an option</option>
                                            <option value="individual">Individual Therapy</option>
                                            <option value="couples">Couples Therapy</option>
                                            <option value="unsure">I'm Not Sure</option>
                                        </select>
                                        <span
                                            className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none ui-muted"
                                        >
                                            expand_more
                                        </span>
                                    </div>
                                </div>
                                {/* Format */}
                                <div className="flex flex-col relative group/field">
                                    <label
                                        htmlFor="format"
                                        className="text-label-md mb-1 ui-muted"
                                    >
                                        Preferred Format
                                    </label>
                                    <div className="relative">
                                        <select id="format" name="format" className="ghost-input pr-8 w-full">
                                            <option value="" disabled selected>Select an option</option>
                                            <option value="online">Online</option>
                                            <option value="in-person">In-person</option>
                                            <option value="either">Either</option>
                                        </select>
                                        <span
                                            className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none ui-muted"
                                        >
                                            expand_more
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="flex flex-col relative group/field pt-4">
                                <label
                                    htmlFor="message"
                                    className="text-headline-md mb-3 ui-heading"
                                >
                                    What would you like us to understand about you before we meet?
                                </label>
                                <p className="text-body-md mb-4 ui-copy">
                                    You don't need to explain everything. A few words are enough. Perhaps{" "}
                                    <em>"I've been feeling anxious for a while,"</em> or simply{" "}
                                    <em>"I think I need some help."</em>
                                </p>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={3}
                                    placeholder="Your message..."
                                    className="ghost-input resize-none"
                                />
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="btn-primary w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    style={{
                                        paddingTop: "1rem",
                                        paddingBottom: "1rem",
                                        paddingLeft: "2rem",
                                        paddingRight: "2rem",
                                        "--tw-ring-color": "var(--color-soft-teal)",
                                    } as React.CSSProperties}
                                >
                                    Request a Session
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right column */}
                    <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
                        {/* Contact card */}
                        <div
                            className="rounded-xl p-8 lg:p-10 surface-sand"
                        >
                            <h3 className="text-headline-md mb-6 ui-heading">
                                Contact
                            </h3>
                            <ul className="space-y-6">
                                {[
                                    { icon: "call", label: "Phone", value: "+91 98337 63977", href: "tel:+919833763977" },
                                    { icon: "forum", label: "WhatsApp", value: "+91 98337 63977", href: "https://wa.me/919833763977" },
                                    { icon: "mail", label: "Email", value: "hello@adorelife.in", href: "mailto:hello@adorelife.in" },
                                ].map((item) => (
                                    <li key={item.label} className="flex items-start gap-4">
                                        <span className="material-symbols-outlined mt-1 ui-accent">
                                            {item.icon}
                                        </span>
                                        <div>
                                            <span className="text-label-md block mb-1 ui-muted">
                                                {item.label}
                                            </span>
                                            <a
                                                href={item.href}
                                                className="text-body-lg transition-colors ui-text"
                                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                onMouseEnter={(e) =>
                                                    ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-soft-teal)")
                                                }
                                                onMouseLeave={(e) =>
                                                    ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-on-surface)")
                                                }
                                            >
                                                {item.value}
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Clinic card */}
                        <div
                            className="rounded-xl p-8 lg:p-10 surface-sand"
                        >
                            <h3 className="text-headline-md mb-6 ui-heading">
                                Visit
                            </h3>
                            <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined mt-1 ui-accent">
                                    location_on
                                </span>
                                <div className="text-body-md ui-copy">
                                    <p className="font-bold mb-1 ui-text">
                                        Somani Health Clinic
                                    </p>
                                    <p>Office 8, Tropical Lagoon,</p>
                                    <p>Anand Nagar, Ghodbunder Road,</p>
                                    <p>Thane West – 400615</p>
                                    <p>Maharashtra, India</p>
                                    <a
                                        href="#"
                                        className="inline-flex items-center gap-2 mt-4 text-label-md transition-colors ui-accent"
                                        onMouseEnter={(e) =>
                                            ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-primary)")
                                        }
                                        onMouseLeave={(e) =>
                                            ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-soft-teal)")
                                        }
                                    >
                                        <span>Get Directions</span>
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Emergency note */}
                        <div
                            className="rounded-xl p-6 border flex items-start gap-4"
                            style={{
                                backgroundColor: "var(--color-surface-variant)",
                                borderColor: "color-mix(in srgb, var(--color-stone-grey) 30%, transparent)",
                            }}
                        >
                            <span
                                className="material-symbols-outlined mt-0.5"
                                style={{ color: "var(--color-stone-grey)", fontVariationSettings: "'FILL' 1" }}
                            >
                                info
                            </span>
                            <div className="text-body-md text-sm ui-copy">
                                <p
                                    className="text-label-md mb-1 uppercase tracking-widest"
                                    style={{ color: "var(--color-on-surface)", fontWeight: 300 }}
                                >
                                    A note about contacting Adore Life
                                </p>
                                <p className="mb-3">
                                    This form is intended for general enquiries and appointment requests. It
                                    should not be used for urgent mental health or crisis support.
                                </p>
                                <p>
                                    If you are experiencing an immediate mental health emergency, please seek
                                    immediate support or contact an emergency service. In India,{" "}
                                    <strong>Tele-MANAS</strong> is available 24/7 at <strong>14416</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Closing ── */}
                <section className="section-pad py-16 md:py-32 flex flex-col items-center text-center w-full">
                    <h2
                        className="text-headline-lg mb-6 max-w-2xl ui-heading"
                    >
                        You don't have to know exactly what to say.
                    </h2>
                    <div
                        className="text-body-lg max-w-xl mx-auto space-y-4 ui-copy"
                    >
                        <p>Sometimes the first message is as simple as: "I think I need some help."</p>
                        <p>That's enough. We'll begin from there.</p>
                        <p
                            className="pt-4 text-quote-intense italic ui-heading"
                        >
                            "We'll begin wherever you are."
                        </p>
                    </div>
                </section>
            </main>


            {/* Watermark */}
            <div className="page-watermark" aria-hidden="true">
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTaG1PgzOhgrkF3uAHlyXW1-I5bvkvk7MQIuwTj9leoJ1AL2Cf7EARRgK784WdoEoHRCsNmwVe6drb1Lt-1BjFChyVgUC2GvcMCuq8hohqdUGgZnxaiYtPXNK024rKWbV__I5KC-MtSTBzlkT3BdexnIcX7gK3N7Y_HUkRfeT5cpl7KNUiAG36xdNrImLdblbEk0G-PQuPet7s4TrTxek2S0gATyNt88GND5yktmzFzjzoqznz3-Vjv0EktiCpabIIig"
                    alt=""
                />
            </div>
        </>
    );
}
