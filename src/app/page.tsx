import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { MotionSection, MotionText, MotionReveal, MotionStagger, MotionItem } from "@/components/ui/Motion";

export const metadata: Metadata = {
  title: "Welcome",
  description: "A welcoming space to be heard, understand yourself, and begin meaningful change.",
};

const recognitionItems = [
  "Overthinking conversations long after they've ended.",
  "Questioning yourself even when you know you're capable.",
  "Finding yourself in the same relationship patterns again and again.",
  "Struggling to say no, set boundaries or put yourself first.",
  "Feeling anxious, overwhelmed or emotionally exhausted.",
  "Wondering why certain situations affect you so deeply.",
  "Knowing what you should do, but finding it difficult to actually do it.",
];

const progression = [
  "I feel understood.",
  "I understand what's keeping me stuck.",
  "I create meaningful change.",
  "I experience emotional freedom.",
];

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <MotionSection className="section-pad mx-auto flex min-h-screen max-w-[1200px] flex-col items-center justify-center mt-[-40px] py-12 text-center">
          <MotionText>
            <h1 className="text-display-lg mb-8 max-w-2xl text-primary">Everyone deserves to be understood.</h1>
          </MotionText>
          <MotionReveal delay={0.2} amount={0.5}>
            <p className="text-headline-md mb-10 max-w-xl italic text-stone-grey">
              What if, for once, you didn&apos;t have to explain everything before someone understood?
            </p>
          </MotionReveal>
          <MotionStagger amount={0.3} className="text-body-lg mb-16 max-w-2xl space-y-6 text-left text-on-surface-variant md:text-center">
            <MotionItem><p>Sometimes, we don&apos;t need advice.</p></MotionItem>
            <MotionItem><p>We don&apos;t need someone to tell us what we should do, how we should feel, or how we should change.</p></MotionItem>
            <MotionItem><p>Sometimes, we simply need a space where our story can be heard without judgement, where what we&apos;re feeling makes sense, and where we can begin to understand ourselves a little better.</p></MotionItem>
            <MotionItem><p>Because understanding isn&apos;t the end of healing. It is where healing begins.</p></MotionItem>
          </MotionStagger>
          <MotionReveal delay={0.6} direction="up" className="flex w-full flex-col items-center gap-6 md:w-auto">
            <Link href="/conversation" className="btn-primary w-full md:w-auto hover:-translate-y-1 hover:shadow-lg transition-all duration-300">Begin To Adore Life</Link>
            <Link href="#recognition" className="text-label-md group inline-flex items-center uppercase tracking-widest text-stone-grey transition-colors hover:text-soft-teal">
              I&apos;m just exploring
              <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-y-1">arrow_downward</span>
            </Link>
          </MotionReveal>
        </MotionSection>

        <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-stone-grey/20 to-transparent" />

        <MotionSection id="recognition" className="section-pad mx-auto flex min-h-screen max-w-[1200px] flex-col justify-center py-32">
          <MotionText>
            <h2 className="text-display-lg mb-10 text-primary">Perhaps you&apos;ve been carrying more than you realise.</h2>
          </MotionText>
          <MotionStagger amount={0.2} className="text-body-lg space-y-8 text-on-surface-variant">
            <MotionItem><p>You may be functioning, working, caring for others and doing everything you&apos;re expected to do.</p></MotionItem>
            <MotionItem><p>And yet, something inside doesn&apos;t feel quite right.</p></MotionItem>
            <MotionItem><p>You may be:</p></MotionItem>
            <ul className="space-y-4 border-l border-stone-grey/30 pl-8 md:pl-12">
              {recognitionItems.map((item) => (
                <MotionItem key={item} className="flex items-start"><span className="mr-4 text-stone-grey" aria-hidden="true">·</span>{item}</MotionItem>
              ))}
            </ul>
            <div className="pt-8">
              <MotionItem><p className="mb-4">Maybe you haven&apos;t found the words for it yet.</p></MotionItem>
              <MotionItem><p className="mb-8">Maybe you don&apos;t even fully understand it yourself.</p></MotionItem>
              <MotionItem><p className="text-headline-md italic text-primary">That&apos;s okay. You don&apos;t have to.</p></MotionItem>
            </div>
          </MotionStagger>
        </MotionSection>

        <MotionSection className="section-pad flex min-h-screen items-center bg-muted-sand/30 py-32">
          <div className="mx-auto w-full max-w-[1000px]">
            <MotionText>
              <h2 className="text-display-lg mb-10 text-center text-primary md:text-left">You don&apos;t need to have everything figured out to begin.</h2>
            </MotionText>
            <MotionStagger amount={0.2} className="text-body-lg mb-16 space-y-6 text-on-surface-variant">
              <MotionItem><p>Most of us learn to cope long before we learn to understand ourselves.</p></MotionItem>
              <MotionItem><p>We learn to keep going. To be strong. To keep everyone happy. To suppress what hurts. To move on. To tell ourselves that things are fine.</p></MotionItem>
              <MotionItem><p>Until one day, the ways we&apos;ve learned to cope begin to feel like the things holding us back.</p></MotionItem>
              <MotionItem><p>That doesn&apos;t mean something is wrong with you.</p></MotionItem>
              <MotionItem><p>It may simply mean there is something within you that deserves to be understood.</p></MotionItem>
            </MotionStagger>
            <MotionReveal delay={0.3}>
              <blockquote className="my-12 border-l-2 border-soft-teal py-2 pl-8">
                <p className="text-quote-intense italic text-primary">“You are not broken. There is a story behind what you feel, think and do.”</p>
              </blockquote>
            </MotionReveal>
          </div>
        </MotionSection>

        <MotionSection className="section-pad mx-auto flex min-h-screen max-w-[1200px] flex-col items-center justify-center py-32 text-center">
          <MotionText>
            <h2 className="text-display-lg mb-10 text-primary">Understanding changes everything.</h2>
          </MotionText>
          <MotionStagger amount={0.3} className="text-body-lg mb-16 space-y-6 text-left text-on-surface-variant md:text-center">
            <MotionItem><p>When we begin to understand why we think, feel, and respond the way we do, something begins to shift.</p></MotionItem>
            <MotionItem><p>We become less critical of ourselves. More aware of our emotions. More compassionate towards our experiences. And more capable of making different choices.</p></MotionItem>
            <MotionItem><p>But sometimes, <strong>understanding alone isn&apos;t enough.</strong></p></MotionItem>
            <MotionItem><p>Our experiences, beliefs, emotions, and learned patterns can continue to influence us beyond our conscious awareness.</p></MotionItem>
          </MotionStagger>
          <MotionStagger amount={0.4} className="text-headline-md flex w-full max-w-md flex-col items-center space-y-6 rounded-2xl bg-surface-variant/40 p-12 text-soft-teal shadow-sm hover:shadow-md transition-shadow duration-500">
            {progression.map((step, index) => (
              <div key={step} className="contents">
                <MotionItem><p className="transition-transform duration-300 hover:scale-105 hover:text-primary">{step}</p></MotionItem>
                {index < progression.length - 1 && <MotionItem><span className="material-symbols-outlined text-stone-grey" aria-hidden="true">arrow_downward</span></MotionItem>}
              </div>
            ))}
          </MotionStagger>
        </MotionSection>

        <MotionSection className="section-pad mx-auto flex min-h-screen max-w-[1200px] flex-col justify-center py-32">
          <MotionText>
            <h2 className="text-display-lg mb-10 text-primary">Imagine having a space where you don&apos;t have to pretend you&apos;re okay.</h2>
          </MotionText>
          <MotionStagger amount={0.3} className="text-body-lg mb-16 space-y-6 text-on-surface-variant">
            <MotionItem><p>A space where you can speak honestly. Pause when you need to. Explore what feels difficult. Ask questions without feeling judged.</p></MotionItem>
            <MotionItem><p>And gradually make sense of the thoughts, emotions and experiences that have shaped you.</p></MotionItem>
            <MotionItem><p>Not because someone is going to tell you how to live.</p></MotionItem>
            <MotionItem><p>But because, sometimes, being genuinely understood gives us the freedom to understand ourselves.</p></MotionItem>
          </MotionStagger>
          <MotionReveal delay={0.2} direction="up" className="mt-8 w-full rounded-2xl bg-sage-green/10 p-10 md:p-16 hover:bg-sage-green/15 transition-colors duration-500">
            <h3 className="text-display-lg mb-6 text-deep-forest">Because everyone deserves to be understood.</h3>
            <div className="text-body-lg space-y-4 text-on-surface-variant">
              <p>Adore Life is built on a simple belief: Understanding comes before meaningful change.</p>
              <p>Our role is to help you understand who you are, what you carry, what shapes you, and what may be keeping you from living the life you want.</p>
              <p>And from that understanding, begin the journey towards emotional freedom.</p>
            </div>
          </MotionReveal>
        </MotionSection>

        <MotionSection className="section-pad flex min-h-[1200px] flex-col items-center justify-center bg-surface-dim py-32 text-center">
          <MotionText>
            <h2 className="text-display-lg mb-6 text-primary">You don&apos;t have to know where to begin.</h2>
          </MotionText>
          <MotionReveal delay={0.2} direction="up">
            <p className="text-body-lg mb-12 text-on-surface-variant">You only need to take the first step.</p>
          </MotionReveal>
          <MotionReveal delay={0.4} direction="up">
            <Link href="/conversation" className="btn-primary mb-4 px-10 py-5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">Begin To Adore Life</Link>
          </MotionReveal>
          <MotionReveal delay={0.6}>
            <p className="text-headline-md mt-4 italic text-stone-grey">Come as you are.</p>
          </MotionReveal>
        </MotionSection>
      </main>
    </>
  );
}
