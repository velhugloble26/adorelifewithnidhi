export default function Stories() {
  return (
    <>

{/*  TopNavBar Component  */}
<nav className="bg-surface/80 dark:bg-surface/80 backdrop-blur-md docked full-width top-0 sticky z-50 transition-opacity duration-500 ease-in-out bg-transparent flat no shadows flex justify-between items-center w-full px-margin-desktop max-w-[1440px] mx-auto py-8">
<a className="tracking-tight text-primary dark:text-primary-fixed hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjEdO88aKw8RdDsTEV-a1jtXM92Mv8XTHTlrbxFEApAyoSg7rexCBk1LLX2zLD3945ryhvdt6sBj4XhTdSpt6c5-t_zVcYMTzJIz67cPG7F49A18pjYoGlfagtk9DpONjG-IEpkKVIpw7LN0jBhx83bPGH-_W0uTxXJqNQUOXaSba1f5NYWN3uUEag9WGCCbK6CugSDeNeCEMvniDwtpS6wgIUdPb05iPkKNSq4lQ6LypeD95edDoT0sHgDrRpAlLA1Q" alt="Adore Life Logo" className="h-[60px] w-auto object-contain" /></a>
<div className="hidden md:flex gap-8 items-center"><a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300 uppercase font-light" href="#" style={{"fontWeight":"300"}}>Home</a>
<a className="font-label-md text-label-md text-primary dark:text-primary-fixed border-b border-soft-teal pb-1 hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300 uppercase font-light" href="#" style={{"fontWeight":"300"}}>Story</a>
<a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300 uppercase font-light" href="#" style={{"fontWeight":"300"}}>Therapy</a>
<a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300 uppercase font-light" href="#" style={{"fontWeight":"300"}}>Conversation</a></div>
<button className="hidden md:inline-flex bg-soft-teal text-white px-6 py-2 rounded-lg font-label-md text-label-md hover:bg-primary transition-colors">
            Begin
        </button>
{/*  Mobile Menu Button  */}
<button className="md:hidden text-primary">
<span className="material-symbols-outlined" data-icon="menu">menu</span>
</button>
</nav>
<main className="flex-grow w-full max-w-[1440px] mx-auto relative z-10">
{/*  Hero Section  */}
<section className="px-margin-mobile md:px-margin-desktop pt-pause-xl pb-pause-lg text-center watermark-bg relative">
<div className="max-w-[800px] mx-auto relative z-10">
<h1 className="font-display-lg text-display-lg text-primary mb-8 leading-tight">
                    What happens when we begin to understand ourselves differently?
                </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                    A collection of reflections from those who have journeyed through quiet transformation, finding clarity in moments of gentle pause.
                </p>
</div>
</section>
{/*  What people often discover  */}
<section className="px-margin-mobile md:px-margin-desktop py-pause-lg bg-surface-container-low">
<div className="max-w-[800px] mx-auto">
<h2 className="font-headline-lg text-headline-lg text-primary mb-12 text-center">Common Discoveries</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div className="flex items-start gap-4">
<span className="material-symbols-outlined text-soft-teal mt-1" data-icon="water_drop" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>water_drop</span>
<p className="font-body-lg text-body-lg text-on-surface">"I wasn't broken, just deeply tired."</p>
</div>
<div className="flex items-start gap-4">
<span className="material-symbols-outlined text-soft-teal mt-1" data-icon="spa" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>spa</span>
<p className="font-body-lg text-body-lg text-on-surface">"I stopped being so hard on myself."</p>
</div>
<div className="flex items-start gap-4">
<span className="material-symbols-outlined text-soft-teal mt-1" data-icon="self_improvement" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>self_improvement</span>
<p className="font-body-lg text-body-lg text-on-surface">"The silence stopped feeling terrifying."</p>
</div>
<div className="flex items-start gap-4">
<span className="material-symbols-outlined text-soft-teal mt-1" data-icon="flare" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>flare</span>
<p className="font-body-lg text-body-lg text-on-surface">"I found a quiet kind of strength."</p>
</div>
</div>
</div>
</section>
{/*  Client Stories Cards  */}
<section className="px-margin-mobile md:px-margin-desktop py-pause-lg">
<h2 className="font-headline-lg text-headline-lg text-primary mb-12 text-center max-w-[800px] mx-auto">Shared Reflections</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<div className="bg-warm-ivory p-8 rounded-lg border border-surface-dim">
<p className="font-quote-intense text-quote-intense text-primary mb-6 italic">
                        "I used to think healing meant fixing everything that was wrong with me. Now I understand it's about making space for everything that is me."
                    </p>
<p className="font-label-md text-label-md text-stone-grey">— Anonymous Reflection</p>
</div>
<div className="bg-muted-sand/30 p-8 rounded-lg border border-surface-dim">
<p className="font-quote-intense text-quote-intense text-primary mb-6 italic">
                        "The approach here wasn't about giving me answers. It was about teaching me how to comfortably sit with the questions until the answers revealed themselves."
                    </p>
<p className="font-label-md text-label-md text-stone-grey">— Client, 6 months later</p>
</div>
<div className="bg-warm-ivory p-8 rounded-lg border border-surface-dim">
<p className="font-quote-intense text-quote-intense text-primary mb-6 italic">
                        "It felt like exhaling after holding my breath for a decade. The gentleness of the space allowed me to finally drop the armor."
                    </p>
<p className="font-label-md text-label-md text-stone-grey">— Anonymous Reflection</p>
</div>
</div>
</section>
{/*  Context & Privacy  */}
<section className="px-margin-mobile md:px-margin-desktop py-pause-lg bg-surface-container">
<div className="max-w-[800px] mx-auto flex flex-col gap-12">
<div>
<h3 className="font-headline-md text-headline-md text-primary mb-4">Why we share stories</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
                        We share these reflections not as testimonials of 'cures', but as beacons of shared humanity. Reading the experiences of others can often articulate a feeling we haven't yet found the words for ourselves. It serves as a gentle reminder that in our struggles, we are rarely alone.
                    </p>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-primary mb-4">Privacy &amp; Consent</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
                        Every story shared on this platform is done so with explicit, informed consent. We deeply respect the sanctity of the therapeutic space. All identifying details have been carefully removed or altered to ensure complete anonymity, preserving the dignity and safety of every individual's journey.
                    </p>
</div>
</div>
</section>
{/*  CTA Section  */}
<section className="px-margin-mobile md:px-margin-desktop py-pause-xl text-center flex flex-col items-center justify-center">
<div className="w-full h-64 max-w-3xl mb-8 rounded-xl overflow-hidden shadow-sm" data-alt="A serene, minimalist still life photograph of smooth, river stones stacked softly on a pale, warm ivory background. Gentle, natural daylight illuminates the stones, creating soft shadows. The mood is tranquil, organic, and grounded, aligning perfectly with a quiet, therapeutic space. The colors are muted earthy tones of grey, sand, and off-white." style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXPILdTi1pkCE0EIlWMn3je6s6jkp3tbVMDb4CMAD5x2Trkr4nqpW_JLo_FRE_3Lsb6xA-twsnceie9Wcqa-U-qUkWtVAA3e_QmF_9CKK3L7JkcucGcgQi5JBJ6Jr3kf6yMe_7sRrxgQN2kz26qIgEJt6QjGjZfiKxoQF62XnVvtaEz6ZAflta89e37OfWfkZMrkC3I9HQnwuRls31F4vFiIRX7IRXLH2YVIsixHApQWVQ55GjsOBX')"}}></div>
<h2 className="font-headline-lg text-headline-lg text-primary mb-6">Ready to explore your own narrative?</h2>
<button className="bg-soft-teal text-white px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-primary transition-colors">
                Begin a Conversation
             </button>
</section>
</main>
{/*  Footer Component  */}
<footer className="bg-surface-container-low dark:bg-inverse-surface full-width bg-surface-container-low dark:bg-inverse-surface flat no shadows transition-all duration-300 w-full px-margin-desktop py-pause-lg flex flex-col md:flex-row justify-between items-center gap-pause-md mt-auto z-10 relative border-t border-surface-dim">
<div className="font-headline-md text-headline-md text-primary dark:text-primary-fixed">
            Adore Life
        </div>
<div className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface text-center md:text-left">
            © Adore Life. Because everyone deserves to be understood.
        </div>
<div className="flex gap-6">
<a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Privacy</a>
<a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Terms</a>
<a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Support</a>
</div>
</footer>

</>
  );
}
