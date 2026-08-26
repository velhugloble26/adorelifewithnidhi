// export default function Corporatewellbeing() {
//   return (
//     <>

// {/*  TopNavBar  */}
// <nav className="glass-nav bg-surface/80 dark:bg-surface/80 backdrop-blur-md sticky top-0 z-50 w-full transition-opacity duration-500 ease-in-out">
// <div className="flex justify-between items-center w-full px-margin-desktop py-6 max-w-[1440px] mx-auto bg-transparent">
// {/*  Brand  */}
// <a className="font-headline-md text-headline-md tracking-tight text-primary dark:text-primary-fixed" href="#"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzUq9CxfMlZyYyJU5RWDlJwf27Uf6PWJqmAYXFD742d3u1I9nGWiImtfJE1wP-9KXTnDZSz16LsuIqYCq1hrzUk-hdHwsmiZTPmMu5KDzZZTT_qYLBKLgtdqESyJYkMEQnLthhiP1QJXzwB_WdlJLKkE5B3choWYd8BG4NcrhlwBdD6FPV6on-DQautDU1A4qQs0epEkodHeExtS1y57v4wnolCDdHA8-8WtBxaV0OoQ59n3ZpTWnBfnaMSEntw2Ba-Q" alt="Adore Life" className="h-[64px] w-auto object-contain" /></a>
// {/*  Desktop Navigation  */}
// <div className="hidden md:flex items-center space-x-8">
// <a className="text-on-surface-variant dark:text-surface-variant text-label-md hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300 font-body-md font-light uppercase tracking-[0.2em]" href="#">Home</a>
// <a className="text-on-surface-variant dark:text-surface-variant text-label-md hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300 font-body-md font-light uppercase tracking-[0.2em]" href="#">Story</a>
// <a className="text-on-surface-variant dark:text-surface-variant text-label-md hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300 font-body-md font-light uppercase tracking-[0.2em]" href="#">Therapy</a>
// {/*  Corporate is Active inherently for this page, but we'll highlight a placeholder if it doesn't match json perfectly. "Conversation" isn't a direct match, but we will leave it inactive for now and assume it's a sub-page. If we must pick one, none match perfectly. We will leave them inactive.  */}
// <a className="text-primary dark:text-primary-fixed border-b border-soft-teal pb-1 text-label-md hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300 font-body-md font-light uppercase tracking-[0.2em]" href="#">Conversation</a>
// </div>
// {/*  Trailing Action  */}
// <div className="hidden md:block">
// <a className="inline-flex items-center justify-center px-6 py-3 bg-soft-teal text-on-primary text-label-md transition-transform hover:scale-105 active:scale-95 rounded-full font-body-md uppercase tracking-wider" href="#enquiry">Begin</a>
// </div>
// {/*  Mobile Menu Toggle  */}
// <button className="md:hidden text-primary">
// <span className="material-symbols-outlined">menu</span>
// </button>
// </div>
// </nav>
// <main className="w-full max-w-[1440px] mx-auto overflow-hidden">
// {/*  Hero Section  */}
// <section className="px-margin-desktop py-pause-xl flex flex-col md:flex-row items-center gap-12">
// <div className="flex-1 space-y-6">
// <h1 className="font-display-lg text-display-lg text-primary">Healthier workplaces begin with understanding people.</h1>
// <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
//                     We partner with forward-thinking organisations to cultivate environments where individuals thrive. Emotional safety and resilience are the foundation of sustainable success.
//                 </p>
// <div className="pt-4">
// <a className="inline-flex items-center gap-2 text-primary font-label-md text-label-md group" href="#enquiry">
// <span className="">Start a Conversation</span>
// <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
// </a>
// </div>
// </div>
// <div className="flex-1 w-full relative">
// <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted-sand">
// <img className="w-full h-full object-cover" data-alt="A serene, modern office environment with soft natural light streaming through large windows. A diverse group of professionals are engaged in a calm, collaborative discussion around a light wood table. The aesthetic is warm, minimalistic, and editorial, using a palette of soft teal, sage green, and warm ivory to evoke a sense of emotional safety and quiet focus. High-fidelity photography style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_nBgI2lDrccJ2yS_VMvcHaIQb6i2yIQU5kRelQZFOhIR65T3SSutggEWZS_KlknduIVoZrAnnasgtf2YZSy5gAjBvmvlMkzhWx5J5T9q5NQjY4nQBdT_AOOC4KN_d4j-IaWJBRG-S8FknAKpcz_NEFHN28Dvpv53jJr1Mt-URQfzay-NKO2OGMV_Dh_5rZ53GxZ2vH5jQbXvAdqnh2Uyc3Ih1nWT11nnF92ndh_HiZJ8uo0eFfXlP" />
// </div>
// </div>
// </section>
// {/*  Visual Pause  */}
// <div className="w-full h-px bg-surface-container-high my-pause-lg"></div>
// {/*  What Organisations Are Seeing  */}
// <section className="px-margin-desktop py-pause-lg bg-warm-ivory rounded-3xl mx-margin-mobile md:mx-margin-desktop mb-pause-xl">
// <div className="max-w-3xl mx-auto text-center mb-12">
// <h2 className="font-headline-lg text-headline-lg text-primary mb-4">What organisations are often seeing</h2>
// <p className="font-body-md text-body-md text-on-surface-variant">The modern workplace demands more than just output. When emotional wellbeing is overlooked, the signs become visible across the organisation.</p>
// </div>
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// {/*  Card 1  */}
// <div className="bg-surface p-8 rounded-lg flex flex-col items-start gap-4 hover:bg-muted-sand transition-colors duration-500">
// <div className="p-3 bg-secondary-fixed rounded-full text-secondary">
// <span className="material-symbols-outlined">battery_0_bar</span>
// </div>
// <h3 className="font-headline-md text-headline-md text-primary">Burnout</h3>
// <p className="font-body-md text-body-md text-on-surface-variant">Chronic exhaustion leading to decreased efficacy and personal detachment.</p>
// </div>
// {/*  Card 2  */}
// <div className="bg-surface p-8 rounded-lg flex flex-col items-start gap-4 hover:bg-muted-sand transition-colors duration-500">
// <div className="p-3 bg-secondary-fixed rounded-full text-secondary">
// <span className="material-symbols-outlined">psychology</span>
// </div>
// <h3 className="font-headline-md text-headline-md text-primary">Stress</h3>
// <p className="font-body-md text-body-md text-on-surface-variant">Elevated pressure impacting decision-making and interpersonal dynamics.</p>
// </div>
// {/*  Card 3  */}
// <div className="bg-surface p-8 rounded-lg flex flex-col items-start gap-4 hover:bg-muted-sand transition-colors duration-500">
// <div className="p-3 bg-secondary-fixed rounded-full text-secondary">
// <span className="material-symbols-outlined">link_off</span>
// </div>
// <h3 className="font-headline-md text-headline-md text-primary">Disengagement</h3>
// <p className="font-body-md text-body-md text-on-surface-variant">A gradual withdrawal of discretionary effort and emotional commitment.</p>
// </div>
// {/*  Card 4  */}
// <div className="bg-surface p-8 rounded-lg flex flex-col items-start gap-4 hover:bg-muted-sand transition-colors duration-500">
// <div className="p-3 bg-secondary-fixed rounded-full text-secondary">
// <span className="material-symbols-outlined">groups</span>
// </div>
// <h3 className="font-headline-md text-headline-md text-primary">Turnover</h3>
// <p className="font-body-md text-body-md text-on-surface-variant">The costly loss of valuable talent seeking healthier environments.</p>
// </div>
// </div>
// </section>
// {/*  Visual Pause  */}
// <div className="w-full h-px bg-surface-container-high my-pause-lg"></div>
// {/*  Footer  */}
// <footer className="w-full px-margin-desktop py-pause-lg flex flex-col md:flex-row justify-between items-center gap-pause-md bg-surface-container-low dark:bg-inverse-surface transition-all duration-300">
// <div className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface text-center">
//                 © Adore Life. Because everyone deserves to be understood.
//             </div>
// <div className="flex gap-6">
// <a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Privacy</a>
// <a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Terms</a>
// <a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Support</a>
// </div>
// </footer>
// </main>

// </>
//   );
// }
