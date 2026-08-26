export default function Insights() {
  return (
    <>

{/*  TopNavBar from Shared Components  */}
<nav className="bg-surface/80 dark:bg-surface/80 backdrop-blur-md docked full-width top-0 sticky bg-transparent z-50 transition-opacity duration-500 ease-in-out">
<div className="flex justify-between items-center w-full px-margin-desktop py-6 max-w-[1440px] mx-auto">
<div className="hidden md:flex items-center gap-8">
<a className="text-on-surface-variant dark:text-surface-variant font-label-md text-label-md hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#">Home</a>
<a className="text-on-surface-variant dark:text-surface-variant font-label-md text-label-md hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#">Story</a>
<a className="text-on-surface-variant dark:text-surface-variant font-label-md text-label-md hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#">Therapy</a>
<a className="text-primary dark:text-primary-fixed border-b border-soft-teal pb-1 font-label-md text-label-md hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#">Conversation</a>
</div>
<button className="bg-soft-teal text-white px-6 py-2 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors hidden md:block">Begin</button>
<button className="md:hidden text-on-surface-variant">
<span className="material-symbols-outlined">menu</span>
</button>
</div>
</nav>
<main className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-pause-lg">
{/*  Hero Section  */}
<section className="text-center max-w-3xl mx-auto mb-pause-xl">
<h1 className="font-display-lg text-display-lg text-primary mb-6">A little more understanding can change the way you see yourself.</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mb-8">Explore curated insights, guided reflections, and practical resources designed to foster emotional clarity and self-compassion. This is a quiet space to learn, unlearn, and grow at your own pace.</p>
</section>
{/*  Featured Insight  */}
<section className="mb-pause-xl">
<div className="bg-warm-ivory rounded-xl overflow-hidden flex flex-col md:flex-row shadow-sm border border-surface-container-high">
<div className="md:w-1/2 relative h-64 md:h-auto">
<img className="absolute inset-0 w-full h-full object-cover" data-alt="A serene, soft-focus photograph of a woman sitting by a large window, thoughtfully writing in a journal. The morning light is diffused, creating a calm, reflective mood. Warm ivory and sage green tones dominate the palette, conveying emotional safety and introspection. Minimalist, uncluttered composition." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXXUyvWnH81GZFujjW_UsqCJtE1SPPqPO5QU-32ThwQYNyoXrppQdBbscc1mRBLBEnpHaVGdEuo_ik16C4WTJ0wo9vaDBvdaZ_Q-Y2H8hNpFGA-B8VOlMYL6nu8FIO6rrddsLp846Zj5o2gs3_ZLUAffST1DbkKiRIZduDIVdWKH0-jL-6Hq3a9I81wCx4J3queZ-gYR46_GiCpYZheInBy6Yn9GJiCT2eumSgasDQ4bfW19FKyaXB" />
</div>
<div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
<span className="inline-block bg-muted-sand/50 text-stone-grey px-3 py-1 rounded-full font-label-md text-label-md w-max mb-4">Featured</span>
<h2 className="font-headline-lg text-headline-lg text-primary mb-4">Why do I know what to do, but still find myself doing the opposite?</h2>
<p className="font-body-md text-body-md text-on-surface-variant mb-6">Understanding the disconnect between our logical intentions and emotional responses. A gentle exploration of self-sabotage and how to cultivate alignment without self-judgment.</p>
<a className="font-label-md text-label-md text-soft-teal border-b border-soft-teal w-max pb-1 hover:text-primary transition-colors" href="#">Read the Article</a>
</div>
</div>
</section>
{/*  Category Grid  */}
<section className="mb-pause-xl">
<h3 className="font-headline-md text-headline-md text-primary mb-8 text-center">Explore by Theme</h3>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{/*  Card 1  */}
<a className="group block p-8 rounded-xl bg-surface-container-low hover:bg-secondary-fixed-dim/20 transition-colors border border-surface-container-high" href="#">
<span className="material-symbols-outlined text-soft-teal mb-4 text-3xl transition-transform group-hover:scale-110" data-icon="psychology">psychology</span>
<h4 className="font-headline-md text-headline-md text-primary mb-2">Understanding Yourself</h4>
<p className="font-body-md text-body-md text-on-surface-variant">Unpack core beliefs and identity.</p>
</a>
{/*  Card 2  */}
<a className="group block p-8 rounded-xl bg-surface-container-low hover:bg-secondary-fixed-dim/20 transition-colors border border-surface-container-high" href="#">
<span className="material-symbols-outlined text-sage-green mb-4 text-3xl transition-transform group-hover:scale-110" data-icon="diversity_1">diversity_1</span>
<h4 className="font-headline-md text-headline-md text-primary mb-2">Relationships</h4>
<p className="font-body-md text-body-md text-on-surface-variant">Navigating connection and boundaries.</p>
</a>
{/*  Card 3  */}
<a className="group block p-8 rounded-xl bg-surface-container-low hover:bg-secondary-fixed-dim/20 transition-colors border border-surface-container-high" href="#">
<span className="material-symbols-outlined text-stone-grey mb-4 text-3xl transition-transform group-hover:scale-110" data-icon="self_improvement">self_improvement</span>
<h4 className="font-headline-md text-headline-md text-primary mb-2">Emotional Wellbeing</h4>
<p className="font-body-md text-body-md text-on-surface-variant">Tools for regulation and calm.</p>
</a>
{/*  Card 4  */}
<a className="group block p-8 rounded-xl bg-surface-container-low hover:bg-secondary-fixed-dim/20 transition-colors border border-surface-container-high" href="#">
<span className="material-symbols-outlined text-soft-teal mb-4 text-3xl transition-transform group-hover:scale-110" data-icon="menu_book">menu_book</span>
<h4 className="font-headline-md text-headline-md text-primary mb-2">Psychology Made Simple</h4>
<p className="font-body-md text-body-md text-on-surface-variant">Accessible concepts for everyday life.</p>
</a>
</div>
</section>
</main>
{/*  Footer from Shared Components  */}
<footer className="bg-surface-container-low dark:bg-inverse-surface full-width">
<div className="w-full px-margin-desktop py-pause-lg flex flex-col md:flex-row justify-between items-center gap-pause-md max-w-[1440px] mx-auto">
<div className="font-headline-md text-headline-md text-primary dark:text-primary-fixed w-[180px]">
                Adore Life
            </div>
<div className="flex gap-6">
<a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Privacy</a>
<a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Terms</a>
<a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Support</a>
</div>
<div className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface text-center md:text-right">
                © Adore Life. Because everyone deserves to be understood.
            </div>
</div>
</footer>

</>
  );
}
