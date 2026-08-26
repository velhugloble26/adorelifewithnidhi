export default function Individualtherapy() {
  return (
    <>

{/*  Watermark  */}
<div aria-hidden="true" className="watermark-n">N</div>
{/*  TopNavBar  */}
<header className="bg-surface/80 dark:bg-surface/80 backdrop-blur-md sticky top-0 full-width w-full z-50 transition-opacity duration-500 ease-in-out border-none">
<div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-6 max-w-[1440px] mx-auto">
<div className="h-16 shrink-0"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBT6TC1Cx7JJhpf94mWPh3tVrDzlQixOdm-rAkGIF-wWq0Up3owa6esB81qQe-ElGRyTD_iPZzGavCmUeVeLuq6ZibIZYl8Fic7oeTOhsS1X5WMKTce_UXh_vybzfBsFlaD7JT0XB9nIVNi8vh2BfnLVaURW4_6wbz5yln6wArsDXhou2m8fCano_3YKxlrMYIR52fG9CDChPN09tHp9zpFm9YSqLGKGNkBPq_wCfQ5JdEpVtdzRuB8HcjRhe7r1fHYww" alt="Adore Life Logo" className="h-full w-auto object-contain" /></div>
<nav className="hidden md:flex gap-8 items-center bg-transparent"><a className="font-body-md text-label-md uppercase tracking-[0.2em] font-light text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#">Home</a><a className="font-body-md text-label-md uppercase tracking-[0.2em] font-light text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#">Story</a><a aria-current="page" className="font-body-md text-label-md uppercase tracking-[0.2em] font-light text-primary dark:text-primary-fixed border-b border-soft-teal pb-1 hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#">Therapy</a><a className="font-body-md text-label-md uppercase tracking-[0.2em] font-light text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#">Conversation</a></nav>
<button className="bg-soft-teal text-white px-8 py-2 rounded-full font-body-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors hidden md:block">Begin</button>
{/*  Mobile Menu Toggle  */}
<button className="md:hidden text-primary">
<span className="material-symbols-outlined">menu</span>
</button>
</div>
</header>
{/*  Main Content Canvas  */}
<main className="flex-grow flex flex-col items-center w-full max-w-[1440px] mx-auto">
{/*  Hero Section  */}
<section className="w-full px-margin-mobile md:px-margin-desktop py-pause-xl flex flex-col md:flex-row items-center gap-12">
<div className="w-full md:w-1/2 flex flex-col gap-6">
<h1 className="font-display-lg text-display-lg text-primary">A space to understand what you're carrying.</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-[600px]">
                    Sometimes the heaviest things we carry are the things we haven't spoken aloud. Individual therapy isn't about 'fixing' you—it's about creating a quiet, safe environment where you can finally set down the weight, examine it, and decide what you want to carry forward.
                </p>
<div className="mt-4">
<button className="bg-sage-green text-deep-forest px-8 py-3 rounded-lg font-label-md text-label-md hover:bg-secondary-fixed transition-colors inline-block">Start a Conversation</button>
</div>
</div>
<div className="w-full md:w-1/2">
<div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted-sand">
<img className="w-full h-full object-cover" data-alt="A softly lit, warm and inviting room with two comfortable linen armchairs facing each other. Sunlight filters through sheer curtains, casting gentle shadows on a natural wooden floor. A small side table holds a steaming cup of tea and a notebook. The overall aesthetic is calming, organic, and minimalist, emphasizing emotional safety and quiet reflection." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWfDoeTiychP6sBsUSyJGvqmXRh_zL1Ozr_c5mRk8qTzya23mNWBxs8NY9DfhVNZgI5sA38MPSmvN0UYDT1H5F7MwtKFw71y5LokE04WVH-LASPFqiubbZyW3OXygit6ScwO7dHXRqnFbYUdn5DcN8Cr9ZC-1CX8Jx5vKcsTO3MUQQJvxsCpk2dKfe8lwGIrW38B8JmAIbvXJ-yhd_1qt85QOd0MFdD0UnuMGX80kdC_aBh_GDrnvr" />
</div>
</div>
</section>
{/*  Visual Pause  */}
<div className="w-full h-px bg-stone-grey/20 max-w-[800px] my-pause-lg"></div>
{/*  Who is this for?  */}
<section className="w-full px-margin-mobile md:px-margin-desktop py-pause-lg">
<div className="max-w-[800px] mx-auto text-center mb-16">
<h2 className="font-headline-lg text-headline-lg text-primary mb-4">Who is this for?</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant">Therapy is for anyone feeling overwhelmed by the quiet noise of daily life.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
{/*  Card 1  */}
<div className="bg-surface p-8 rounded-lg border border-stone-grey/20 hover:bg-muted-sand/30 transition-colors">
<h3 className="font-headline-md text-headline-md text-soft-teal mb-3">Anxiety &amp; Overwhelm</h3>
<p className="font-body-md text-body-md text-on-surface-variant">When your mind feels like a crowded room and you can't find the silence.</p>
</div>
{/*  Card 2  */}
<div className="bg-surface p-8 rounded-lg border border-stone-grey/20 hover:bg-muted-sand/30 transition-colors">
<h3 className="font-headline-md text-headline-md text-soft-teal mb-3">Burnout</h3>
<p className="font-body-md text-body-md text-on-surface-variant">When you've been running on empty for so long that rest feels like a luxury you can't afford.</p>
</div>
{/*  Card 3  */}
<div className="bg-surface p-8 rounded-lg border border-stone-grey/20 hover:bg-muted-sand/30 transition-colors">
<h3 className="font-headline-md text-headline-md text-soft-teal mb-3">Life Transitions</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Navigating the space between what was and what will be.</p>
</div>
{/*  Card 4  */}
<div className="bg-surface p-8 rounded-lg border border-stone-grey/20 hover:bg-muted-sand/30 transition-colors">
<h3 className="font-headline-md text-headline-md text-soft-teal mb-3">Relationship Patterns</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Understanding the cycles you keep repeating and learning how to break them gracefully.</p>
</div>
{/*  Card 5  */}
<div className="bg-surface p-8 rounded-lg border border-stone-grey/20 hover:bg-muted-sand/30 transition-colors">
<h3 className="font-headline-md text-headline-md text-soft-teal mb-3">Grief &amp; Loss</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Finding a place to put the love that no longer has a destination.</p>
</div>
</div>
</section>
{/*  The Journey (Progression)  */}
<section className="w-full px-margin-mobile md:px-margin-desktop py-pause-xl bg-muted-sand/20">
<div className="max-w-[800px] mx-auto text-center mb-16">
<h2 className="font-headline-lg text-headline-lg text-primary mb-4">The Journey</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant">A gentle unfolding, taken at your pace.</p>
</div>
<div className="max-w-[600px] mx-auto relative">
{/*  Vertical Line  */}
<div className="absolute left-[15px] top-0 bottom-0 w-px bg-stone-grey/40"></div>
<div className="flex flex-col gap-12">
{/*  Step 1  */}
<div className="flex gap-8 relative">
<div className="w-[30px] h-[30px] rounded-full bg-surface border border-soft-teal flex items-center justify-center z-10 shrink-0 mt-1">
<span className="w-2 h-2 rounded-full bg-soft-teal"></span>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-primary mb-2">1. Begin Where You Are</h3>
<p className="font-body-md text-body-md text-on-surface-variant">We start with a gentle conversation to understand what brought you here.</p>
</div>
</div>
{/*  Step 2  */}
<div className="flex gap-8 relative">
<div className="w-[30px] h-[30px] rounded-full bg-surface border border-stone-grey flex items-center justify-center z-10 shrink-0 mt-1">
<span className="w-2 h-2 rounded-full bg-stone-grey/50"></span>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-primary mb-2">2. Establish Safety</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Creating a non-judgmental space where all parts of you are welcome.</p>
</div>
</div>
{/*  Step 3  */}
<div className="flex gap-8 relative">
<div className="w-[30px] h-[30px] rounded-full bg-surface border border-stone-grey flex items-center justify-center z-10 shrink-0 mt-1">
<span className="w-2 h-2 rounded-full bg-stone-grey/50"></span>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-primary mb-2">3. Exploration</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Gently examining the thoughts and feelings that feel heavy or stuck.</p>
</div>
</div>
{/*  Step 4  */}
<div className="flex gap-8 relative">
<div className="w-[30px] h-[30px] rounded-full bg-surface border border-stone-grey flex items-center justify-center z-10 shrink-0 mt-1">
<span className="w-2 h-2 rounded-full bg-stone-grey/50"></span>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-primary mb-2">4. Insight</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Connecting the dots between your past experiences and present reality.</p>
</div>
</div>
{/*  Step 5  */}
<div className="flex gap-8 relative">
<div className="w-[30px] h-[30px] rounded-full bg-surface border border-stone-grey flex items-center justify-center z-10 shrink-0 mt-1">
<span className="w-2 h-2 rounded-full bg-stone-grey/50"></span>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-primary mb-2">5. Integration</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Learning to sit with discomfort and developing new ways to respond.</p>
</div>
</div>
{/*  Step 6  */}
<div className="flex gap-8 relative">
<div className="w-[30px] h-[30px] rounded-full bg-surface border border-stone-grey flex items-center justify-center z-10 shrink-0 mt-1">
<span className="w-2 h-2 rounded-full bg-stone-grey/50"></span>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-primary mb-2">6. Move Forward</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Stepping back into your life with more clarity and a lighter load.</p>
</div>
</div>
</div>
</div>
</section>
{/*  CTA Section  */}
<section className="w-full px-margin-mobile md:px-margin-desktop py-pause-xl text-center">
<div className="max-w-[600px] mx-auto">
<h2 className="font-display-lg text-display-lg text-primary mb-6">Whenever you're ready.</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
                    There is no pressure to have it all figured out before we speak. Reaching out is often the hardest part. Let's just start with a hello.
                </p>
<button className="bg-soft-teal text-white px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-primary transition-colors inline-block">Begin a Conversation</button>
</div>
</section>
</main>
{/*  Footer  */}
<footer className="bg-surface-container-low dark:bg-inverse-surface w-full px-margin-mobile md:px-margin-desktop py-pause-lg flex flex-col md:flex-row justify-between items-center gap-pause-md mt-auto border-none transition-all duration-300">
<div className="font-headline-md text-headline-md text-primary dark:text-primary-fixed">Adore Life</div>
<nav className="flex gap-6 items-center">
<a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Privacy</a>
<a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Terms</a>
<a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Support</a>
</nav>
<div className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface text-center md:text-right">
            © Adore Life. Because everyone deserves to be understood.
        </div>
</footer>

</>
  );
}
