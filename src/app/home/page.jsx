"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";



const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBMAKFsFn94ug11YHD_XL_PUsszAUTFCLakp4D-PZEcCF8uoojZXCaK5ylCpNE2v5UDSn4tHydslKGfdqS6sl8PC1rcI8eUU0OI3gVuND5i5ExQ-D08mSsE_uJXfRgSxhCY3if1rNv8OdzIHFEu5Mfqh6Ey1Ujfn8zTD9LGsDKeDooKVHT-j3hHMetfGrjPI3tGo7psMSXFvosM2L1XwWBEX2SgGi1RNRIQmDFE084asVaQPJ3upzII";

const HERO_WATERMARK =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCwX80a2m9hE9jpy1RhirYecCpM8wEN_cTmZz094m7eTPeN40pYkZVYOpRBYhytkyPMlFdefyIuqYPFh2yaemBgwgab-H0KTyiLlcq3iNpqeq8ECWXhVnC0gTL_tg0_PntMM2g1hTdVvWuQGTExcabuyYfnGErGT9vJya56J3y1iFtX__R4sFMef8TYH8tCq4_jA2G8DrqfQPGYMZXwgPbbx0lL_Ju0VYaZRn9pNFHXzfu78Fw43V7opLHT-p02zj94hg";

const NIDHI_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB8UhDZOpERUsmQpWtTpZg460gu5ptkmQkFLetcjzxRvEVy-VFeyv45F7iaT_sgiIVCt32Q0BRikzitesQZ7zG4oiQdn_9pEmou3GcI7eED8rU7SQTG8gDXocu1imDYc4-kFWKegmgPiJkddvUeYQpyjqx9BrtLixao7v4Mz1271gc7SYvPJzO08YO3gt3CGvHHHF7vPqDnl7Cxg3tUH6npesl24BZlksxcE8xhyhT97eSRMBxiZ8T2";

const WATERMARK =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDG16LXmYpSvjNOurGU5tmQ7q4zLaTv94D6I3BDi6CPai5VatKtP7Ho-bgVdAhR8sovzMMouB_K4GhTdXjzi62SjtelqndNTH4_BUyXH5pLMvKxp3y0JoZ5PGKa9pvyBDySv984YJGweHFtCdbirPRLnvVboKeUFVJIOfgDuc1BJDPf1Ym5dm1w-lGeIaOFXRVUkiNIqtafsSSv_M8zdwBiZMPMhcqUPRit_4OkamDiQTp1W7hblh0Hei2jEYutYryG_Q";

const recognitionCards = [
  {
    icon: "all_inclusive",
    title: "Overthink everything",
    body: "You replay conversations, decisions and possibilities long after they've passed.",
  },
  {
    icon: "psychology_alt",
    title: "Question yourself",
    body: "You know you're capable, yet self-doubt keeps finding its way in.",
  },
  {
    icon: "sync",
    title: "Keep repeating patterns",
    body: "Different people, different situations—but somehow the same emotional story.",
  },
  {
    icon: "favorite_border",
    title: "Find relationships difficult",
    body: "You want connection, but communication, trust or boundaries don't always come easily.",
  },
  {
    icon: "battery_0_bar",
    title: "Feel emotionally exhausted",
    body: "Even when you're resting, your mind doesn't seem to switch off.",
  },
  {
    icon: "front_hand",
    title: "Struggle to put yourself first",
    body: "Saying no feels uncomfortable. Setting boundaries feels selfish.",
  },
];

const helpAreas = [
  {
    title: "Individual Therapy",
    body: "A space to understand yourself, your emotions and the patterns that may be keeping you stuck.",
    href: "/therapy/individual",
  },
  {
    title: "Couples Therapy",
    body: "Because healthier relationships begin with understanding—not deciding who is right or wrong.",
    href: "/therapy/couples",
  },
  {
    title: "Women's Wellness",
    body: "Conversations around emotional wellbeing, self-worth, relationships and life transitions.",
    href: "/therapy/womens-wellness",
  },
  {
    title: "Workshops & Webinars",
    body: "Interactive experiences designed to make psychology practical, accessible and relevant to everyday life.",
    href: "/therapy/workshops",
  },
  {
    title: "Corporate Wellbeing",
    body: "Helping organisations build healthier, more emotionally aware workplaces.",
    href: "/therapy/corporate",
  },
  {
    title: "Schools & Colleges",
    body: "Helping young people, parents and educators develop emotional awareness and healthier ways of navigating life.",
    href: "/therapy/schools",
  },
];

const progressionSteps = [
  { num: "01", label: "I feel understood" },
  { num: "02", label: "I understand myself" },
  { num: "03", label: "I begin to heal" },
];

const progressionSteps2 = [
  { num: "04", label: "I make different choices" },
  { num: "05", label: "I experience emotional freedom", highlight: true },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section
          className="relative flex items-center pt-16 pb-32 overflow-hidden"
          style={{ minHeight: "calc(100svh - 80px)" }}
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src={HERO_BG}
              alt=""
              className="w-full h-full object-cover"
              style={{ opacity: 0.4 }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, color-mix(in srgb, var(--color-background) 60%, transparent) 0%, color-mix(in srgb, var(--color-background) 80%, transparent) 50%, var(--color-background) 100%)",
              }}
            />
            {/* Watermark overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <img
                src={HERO_WATERMARK}
                alt=""
                aria-hidden="true"
                className="w-[120%] h-[120%] object-contain rotate-12"
                style={{
                  opacity: 0.06,
                  transform: "translateX(-25%) translateY(25%) rotate(12deg)",
                }}
              />
            </div>
          </div>

          {/* Hero content */}
          <div className="relative z-10 max-w-[1500px] mx-auto text-center flex flex-col items-center section-pad w-full">
            <div
              className="mb-4 tracking-[0.3em] uppercase text-label-md"
              style={{ color: "var(--color-primary)", opacity: 0.6 }}
            >
              adore life
            </div>
            <h1 className="text-display-lg mb-8 ui-heading">
              Because everyone deserves to be understood.
            </h1>
            <p className="text-body-lg mb-12 max-w-[600px] ui-copy">
              There are times when life feels heavier than it should. You may be
              overthinking, feeling emotionally exhausted, struggling in a relationship,
              questioning yourself, or simply wondering why you keep responding to life in
              the same ways.
              <br />
              <br />
              You don't always need another piece of advice. Sometimes, you need someone who
              can truly understand what you're carrying.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
              <Link
                href="/conversation"
                className="btn-primary w-full sm:w-auto btn-lg"
              >
                Begin to Adore Life
              </Link>
              <Link
                href="/therapy"
                className="text-label-md transition-colors w-full sm:w-auto text-center pb-0.5"
                style={{
                  color: "var(--color-primary)",
                  borderBottom: "1px solid var(--color-primary)",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    "var(--color-soft-teal)";
                  e.currentTarget.style.borderBottomColor =
                    "var(--color-soft-teal)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "var(--color-primary)";
                  e.currentTarget.style.borderBottomColor =
                    "var(--color-primary)";
                }}
              >
                Explore How Therapy Can Help
              </Link>
            </div>
          </div>
        </section>

        {/* ── Recognition ── */}
        <section
          className="py-32 section-pad surface-low"
        >
          <div className="max-w-[1200px] mx-auto">
            <div className="max-w-[800px] mx-auto text-center mb-16">
              <h2 className="text-headline-lg mb-6 ui-heading">
                Perhaps you've been carrying this for longer than you realise.
              </h2>
              <p className="text-body-lg ui-copy">
                You may be managing life on the outside while quietly struggling on the
                inside. Maybe you…
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recognitionCards.map((card, i) => (
                <div
                  key={i}
                  className="glass-panel rounded-xl p-8 flex flex-col"
                  style={{ transition: "transform 0.3s ease" }}
                  onMouseEnter={(e) =>
                  (e.currentTarget.style.transform =
                    "translateY(-4px)")
                  }
                  onMouseLeave={(e) =>
                  (e.currentTarget.style.transform =
                    "translateY(0)")
                  }
                >
                  <span
                    className="material-symbols-outlined text-3xl mb-4 ui-accent"
                  >
                    {card.icon}
                  </span>
                  <h3 className="text-headline-md mb-3 ui-heading">
                    {card.title}
                  </h3>
                  <p className="text-body-md ui-copy">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p
                className="text-body-lg italic mb-8 ui-copy"
              >
                You don't have to relate to all of these. Sometimes, one is enough to know
                that something within you deserves attention.
              </p>
              <Link
                href="/conversation"
                className="btn-primary inline-flex"
                style={{
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                  backgroundColor: "var(--color-sage-green)",
                }}
                onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-secondary)")
                }
                onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-sage-green)")
                }
              >
                Let's Understand What's Really Going On
              </Link>
            </div>
          </div>
        </section>

        {/* ── Brand Truth ── */}
        <section
          className="py-32 section-pad surface-ivory"
        >
          <div className="max-w-[800px] mx-auto">
            <h2
              className="text-display-lg mb-8 text-center ui-heading"
            >
              Knowing what to do isn't always enough.
            </h2>
            <div
              className="text-body-lg space-y-6 ui-copy"
            >
              <p>Most of us know, at least intellectually, what we should do.</p>
              <ul className="space-y-3 pl-8">
                {["Set boundaries.", "Stop overthinking.", "Trust ourselves.", "Let go of the past."].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0 divider-muted"
                      />
                      {item}
                    </li>
                  )
                )}
              </ul>
              <p>
                But knowing isn't the same as being able to change. Because the way we
                think, feel and respond is shaped by much more than what we consciously
                know.
              </p>
              <p>
                When we begin to understand those deeper patterns, change becomes more than
                an effort to behave differently. It becomes a process of seeing ourselves
                differently.
              </p>
            </div>
            <blockquote
              className="mt-12 p-8 rounded-r-xl shadow-sm"
              style={{
                borderLeft: "2px solid var(--color-soft-teal)",
                backgroundColor: "var(--color-surface-container-lowest)",
              }}
            >
              <p
                className="text-quote-intense italic ui-heading"
              >
                "You are not broken. There is a story behind what you feel, think and do."
              </p>
            </blockquote>
          </div>
        </section>

        {/* ── Progression ── */}
        <section
          className="py-32 section-pad surface-base"
        >
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-headline-lg mb-6 ui-heading">
                Healing doesn't begin with answers. It begins with understanding.
              </h2>
              <p
                className="text-body-lg max-w-[700px] mx-auto ui-copy"
              >
                When you feel genuinely understood, something changes. You don't have to
                defend yourself. You can become curious about yourself instead of critical of
                yourself.
              </p>
            </div>

            {/* Steps row 1 */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">
              {progressionSteps.map((step, i) => (
                <>
                  <div
                    key={step.num}
                    className="flex-1 flex flex-col items-center text-center p-6 rounded-xl border w-full"
                    style={{
                      backgroundColor: "var(--color-surface-bright)",
                      borderColor: "color-mix(in srgb, var(--color-surface-variant) 50%, transparent)",
                    }}
                  >
                    <span
                      className="text-label-md mb-2 block uppercase tracking-[0.2em] ui-label-accent"
                    >
                      {step.num}
                    </span>
                    <span className="text-headline-md ui-heading">
                      {step.label}
                    </span>
                  </div>
                  {i < progressionSteps.length - 1 && (
                    <span
                      key={`arrow-${i}`}
                      className="material-symbols-outlined rotate-90 md:rotate-0 ui-muted"
                    >
                      arrow_forward
                    </span>
                  )}
                </>
              ))}
            </div>

            {/* Steps row 2 */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4 w-full">
              {progressionSteps2.map((step, i) => (
                <>
                  <div
                    key={step.num}
                    className="flex-1 max-w-[300px] flex flex-col items-center text-center p-6 rounded-xl border w-full"
                    style={{
                      backgroundColor: "var(--color-surface-bright)",
                      borderColor: step.highlight
                        ? "var(--color-soft-teal)"
                        : "color-mix(in srgb, var(--color-surface-variant) 50%, transparent)",
                      ...(step.highlight && {
                        backgroundColor:
                          "color-mix(in srgb, var(--color-soft-teal) 5%, var(--color-surface-bright))",
                      }),
                    }}
                  >
                    <span
                      className="text-label-md mb-2 block uppercase tracking-[0.2em] ui-label-accent"
                    >
                      {step.num}
                    </span>
                    <span className="text-headline-md ui-heading">
                      {step.label}
                    </span>
                  </div>
                  {i < progressionSteps2.length - 1 && (
                    <span
                      key={`arrow2-${i}`}
                      className="material-symbols-outlined rotate-90 md:rotate-0 hidden md:block ui-muted"
                    >
                      arrow_forward
                    </span>
                  )}
                </>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-body-md ui-muted">
                This is the belief at the heart of Adore Life.
              </p>
            </div>
          </div>
        </section>

        {/* ── Meet Nidhi ── */}
        <section
          className="py-32 section-pad surface-low"
        >
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image */}
            <div className="lg:col-span-5 relative">
              <div
                className="aspect-[4/5] rounded-xl overflow-hidden shadow-sm relative"
                style={{ border: "1px solid color-mix(in srgb, white 50%, transparent)" }}
              >
                <img
                  src={NIDHI_IMG}
                  alt="Nidhi Roy – therapist at Adore Life"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 flex items-end p-8"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)",
                  }}
                >
                  <p className="text-headline-md" style={{ color: "white" }}>
                    Nidhi Roy
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h2
                className="text-display-lg mb-6 ui-heading"
              >
                Therapy begins with feeling understood.
              </h2>
              <div
                className="text-body-lg space-y-6 mb-10 ui-copy"
              >
                <p>Hi, I'm Nidhi.</p>
                <p>
                  Over the years, I've met many people who came to therapy believing that
                  something was wrong with them. As we began exploring their stories together,
                  we often discovered something very different.
                </p>
                <p>
                  They weren't broken. They were carrying experiences, beliefs, emotions and
                  patterns that had quietly shaped the way they saw themselves, their
                  relationships and the world around them.
                </p>
                <p>
                  I don't believe people need someone to tell them what to do. I believe they
                  need a safe, collaborative space where they can understand themselves more
                  deeply—and from that understanding, discover the possibility of change.
                </p>
              </div>

              {/* Approach callout */}
              <div
                className="p-8 rounded-xl border mb-8"
                style={{
                  backgroundColor: "var(--color-surface-bright)",
                  borderColor: "var(--color-surface-variant)",
                }}
              >
                <h3 className="text-headline-md mb-4 ui-heading">
                  No two people carry the same story.
                </h3>
                <p className="text-body-md mb-6 ui-copy">
                  Your therapy shouldn't be the same as everyone else's. My approach brings
                  together relevant, evidence-informed psychological approaches and adapts
                  them to the individual.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { label: "Compassion", body: "Understanding without judgement." },
                    { label: "Collaboration", body: "Working with you, not telling you what to do." },
                    { label: "Individuality", body: "A journey shaped around your story." },
                  ].map((item) => (
                    <div key={item.label}>
                      <span
                        className="text-label-md block mb-1 uppercase tracking-[0.2em] ui-label-accent"
                      >
                        {item.label}
                      </span>
                      <span
                        className="text-body-md text-sm ui-copy"
                      >
                        {item.body}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/story"
                className="inline-flex items-center text-label-md border-b pb-1 group transition-colors"
                style={{
                  color: "var(--color-primary)",
                  borderColor: "var(--color-primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-soft-teal)";
                  e.currentTarget.style.borderBottomColor = "var(--color-soft-teal)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-primary)";
                  e.currentTarget.style.borderBottomColor = "var(--color-primary)";
                }}
              >
                Meet Nidhi
                <span className="material-symbols-outlined ml-2" style={{ fontSize: "1.1rem" }}>
                  arrow_right_alt
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Help Areas ── */}
        <section
          className="py-32 section-pad surface-base"
        >
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16 max-w-[800px] mx-auto">
              <h2
                className="text-display-lg mb-6 ui-heading"
              >
                Whatever you're carrying, you don't have to carry it alone.
              </h2>
              <p className="text-body-lg ui-copy">
                Adore Life offers support across different aspects of emotional wellbeing and
                relationships.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {helpAreas.map((area) => (
                <Link
                  key={area.title}
                  href={area.href}
                  className="group block p-8 rounded-xl border transition-all duration-300"
                  style={{
                    backgroundColor: "var(--color-surface-container-lowest)",
                    borderColor: "var(--color-surface-variant)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--color-soft-teal)";
                    e.currentTarget.style.boxShadow =
                      "0 1px 6px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--color-surface-variant)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <h3
                    className="text-headline-md mb-4 transition-colors group-hover:text-[var(--color-soft-teal)] ui-heading"
                  >
                    {area.title}
                  </h3>
                  <p className="text-body-md mb-6 ui-copy">
                    {area.body}
                  </p>
                  <span
                    className="text-label-md flex items-center ui-accent"
                  >
                    Explore{" "}
                    <span className="material-symbols-outlined ml-1 text-sm">arrow_outward</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing CTA ── */}
        <section
          className="py-32 section-pad surface-sand"
        >
          <div className="max-w-[800px] mx-auto text-center">
            <h2
              className="text-display-lg mb-6 ui-heading"
            >
              You don't have to have everything figured out.
            </h2>
            <div
              className="text-body-lg space-y-4 mb-10 ui-copy"
            >
              <p>You don't need the perfect words.</p>
              <p>You don't need to know exactly what's wrong.</p>
              <p>You don't even need to know whether therapy is right for you yet.</p>
              <p>You can simply begin with a conversation.</p>
            </div>
            <Link
              href="/conversation"
              className="btn-primary inline-flex mb-4"
              style={{
                paddingTop: "1rem",
                paddingBottom: "1rem",
                paddingLeft: "2rem",
                paddingRight: "2rem",
                backgroundColor: "var(--color-primary)",
              }}
              onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-soft-teal)")
              }
              onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-primary)")
              }
            >
              Begin a Conversation
            </Link>
            <p
              className="text-body-md italic mt-4 ui-muted"
            >
              Whenever you're ready, we'll begin wherever you are.
            </p>
          </div>
        </section>
      </main>


      {/* Watermark */}
      <div className="page-watermark" aria-hidden="true">
        <img src={WATERMARK} alt="" />
      </div>
    </>
  );
}
