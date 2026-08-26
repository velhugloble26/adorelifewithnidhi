// export default function Community() {
//   return (
//     <>

// {/*  TopNavBar  */}
// <nav className="bg-surface/80 dark:bg-surface/80 backdrop-blur-md full-width top-0 sticky z-50 transition-opacity duration-500 ease-in-out">
// <div className="flex justify-between items-center w-full px-margin-desktop py-6 max-w-[1440px] mx-auto bg-transparent flat no shadows"><div className="h-8 mr-8"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTsP6cf7lx_Bnb3UgxCm1nox12C7b1GchbidrU7N0ThzinrICMXA4ybKrq1RCKTWFnJrvIaBF_nZTtY1GvwxF_yizJH-o35dyHwA5ieI3tCbmSiqRNeEAomVTAAPLOC6TEwtDg2QZo7honjeVpLt2Rkxyxio9GQhcxn47BCFDOhAivypd2gC5zI2PrZm60AyLzA6alPciiArfUZ9rbZkPJb229Fv8BRH1JSSWV-NUQh_wfJgxaX79CK1sQc5z8k5Y3WA" alt="Adore Life" className="h-full w-auto object-contain" /></div>
// <ul className="hidden md:flex gap-8 items-center">
// <li className=""><a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#">Home</a></li>
// <li className=""><a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#">Story</a></li>
// <li className=""><a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#">Therapy</a></li>
// <li className=""><a aria-current="page" className="font-label-md text-label-md text-primary dark:text-primary-fixed border-b border-soft-teal pb-1 hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#">Conversation</a></li>
// </ul>
// <button className="hidden md:inline-flex font-label-md text-label-md text-soft-teal dark:text-inverse-primary hover:text-primary transition-colors duration-300 items-center gap-2">
//                 Begin <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
// </button>
// {/*  Mobile Menu Toggle (Visual only for this static build)  */}
// <button className="md:hidden text-primary">
// <span className="material-symbols-outlined">menu</span>
// </button>
// </div>
// </nav>
// <main className="flex-grow flex flex-col items-center w-full">
// {/*  Hero Section  */}
// <section className="w-full max-w-[1440px] px-margin-mobile md:px-margin-desktop pt-pause-lg pb-pause-md flex flex-col items-center text-center">
// <h1 className="font-display-lg text-display-lg text-primary max-w-4xl mx-auto leading-tight mb-8">
//                 Understanding should be accessible to everyone.
//             </h1><div className="mb-8 max-w-md mx-auto"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQruSrKnqijF_8H5LnwovS6kYcwSFoep5B30vU2xB0A9Nzwo2nrBlTw9yg-BmETOG1p4Ap1PAyJqJRupulhPts480AFfKbW8m2SIbM3FI1ltGdV2vH9xshTke4KmAjyP_KDOnRGFBMAP-WOHvxOzII9V4GdElQyaJkluz8JG5JpFQY9t1p1Jmwev66Rvz4tCjNNSbT-OlK7WMqSFjRRwR3BhMaiprfoMpLUTVWRoUvdkjE0ldpSaWyWSnHIW4X2dl8gQ" alt="Because Everyone Deserves To Feel Understood" className="w-full h-auto" /></div>
// <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
//                 We extend our practice beyond the therapy room, collaborating with communities and NGOs to create safe spaces where transformative dialogue can begin.
//             </p>
// <div className="w-full aspect-[21/9] bg-surface-container rounded-lg overflow-hidden relative">
// <img className="w-full h-full object-cover mix-blend-multiply opacity-90" data-alt="A candid, medium-wide photograph of a diverse group of women sitting in a loose circle in a sunlit, airy community hall, engaged in a supportive, quiet conversation. The natural daylight casts gentle, soft shadows across the wooden floor. The aesthetic is organic and highly tactile, featuring warm ivory tones, muted sands, and hints of sage green in their comfortable clothing. The mood is emotionally safe, empathetic, and gently uplifting, entirely avoiding any clinical coldness. Shot on high-quality 35mm film stock." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3HgN9o_3LIWOg_w-VPYvsYJUG2Ip8uk_Wqm1tFZ9nW5sxVf3j1M7a041_5FDzLl2WfXGdkCRi-3_9H_BaiR-OphD8m7ZUaxL-i6ugX75JiR6CXa0P3n3X3OiuJ6GX2IVtRAkvO7ZHOVPx2i4-_lkcVZt7bSC2rZKBGGF5mcGcaFzpnxx8smSCVxBscB8eQX_95IIioy8B7fIUjYDYkx9i-qEUCbKdCiIql7d5l5HCr95mcswlTRDq" />
// </div>
// </section>
// {/*  Why Community Matters  */}
// <section className="w-full max-w-[1440px] px-margin-mobile md:px-margin-desktop py-pause-lg flex flex-col md:flex-row gap-16 items-start">
// <div className="md:w-1/3 sticky top-32"><div className="absolute -left-16 -top-16 w-48 h-48 opacity-10 z-0 pointer-events-none"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjh40mqhhVq1mRfwGkvW7x8tcvlHnTiVcwRvQdhRSWfsoN1R9gjxtp7edQD_bmYcpNF8Obcl_gFplIyEfSJd7JbeCptyexkJGwhAiRRsgTxTYkQQNZf-FvSkHQYtWHbSigfXKNWBoBOVIWFBn3pokleE2deApk0Xjob-_LtZo1QSqwOuRB5W9hs7uUr9rISeLyBu3SaUcHjtMfmKYI6gEGyR8FFNB8ICXGbTPLKKLrANT0yJHqajPrkU9wYVapTObovA" alt="" className="w-full h-full object-contain" /></div>
// <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Why Community Matters</h2>
// <div className="w-12 h-[1px] bg-stone-grey mb-6"></div>
// </div>
// <div className="md:w-2/3 flex flex-col gap-8 font-body-lg text-body-lg text-on-surface-variant">
// <p className="">
//                     Healing rarely happens in isolation. The language we use, the spaces we inhabit, and the people we surround ourselves with profoundly shape our capacity to understand ourselves and others.
//                 </p>
// <p className="">
//                     Our community programmes are designed to dismantle the barriers of clinical psychology, translating complex therapeutic concepts into gentle, accessible language. We build "soft invitations" for individuals to begin their journey of self-inquiry within the safety of a shared experience.
//                 </p>
// </div>
// </section>
// {/*  Programme Themes (Bento Grid)  */}
// <section className="w-full bg-warm-ivory py-pause-xl">
// <div className="max-w-[1440px] px-margin-mobile md:px-margin-desktop mx-auto">
// <h2 className="font-headline-lg text-headline-lg text-primary text-center mb-16">Our Programme Themes</h2>
// <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
// {/*  Card 1  */}
// <div className="bg-muted-sand p-10 rounded-lg flex flex-col gap-6 md:col-span-2 aspect-auto md:aspect-[2/1] justify-end relative overflow-hidden group">
// <div className="absolute inset-0 z-0">
// <img className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700" data-alt="A high-fidelity editorial photograph of hands working together on a collaborative journaling exercise on a large wooden table. The scene is grounded in an organic, minimalist style. Soft, diffused daylight illuminates the tactile paper textures and neutral-toned pens. The color palette focuses on deep forest greens, stone greys, and warm off-whites. The atmosphere conveys a sense of shared understanding and gentle focus. Shallow depth of field." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_-kTDyC6uRuWeYVeHN50k_HoFrQyw41VczCD3pQo6GKhWHPbYWBMIn5c4KANqnCdAGRTcX6pgFvfDS7oPJ-a_1z6wHd3DW7f61LLX87yWlnbMjcOVvQXBoMkv5T0dBnhqxNcfIHb-7AvBk0LdM0ZIYCjpyVVv6vRZPVm-MrkwMXJGkzBM08BM0oOg3a5WgXGVUZB6t1xpr6fD7mBwNOXlF0ECSZ8oFcgLPjR9AihpsWju8SjLK0Ts" />
// </div>
// <div className="relative z-10">
// <span className="material-symbols-outlined text-soft-teal mb-2 text-3xl">forum</span>
// <h3 className="font-headline-md text-headline-md text-primary mb-2">Awareness Talks</h3>
// <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
//                                 Gentle, introductory sessions exploring emotional literacy, the power of boundaries, and the foundations of self-compassion.
//                             </p>
// </div>
// </div>
// {/*  Card 2  */}
// <div className="bg-surface-container-high p-10 rounded-lg flex flex-col gap-6 justify-between border border-stone-grey/20">
// <div>
// <span className="material-symbols-outlined text-sage-green mb-4 text-3xl">psychology_alt</span>
// <h3 className="font-headline-md text-headline-md text-primary mb-2">Interactive Workshops</h3>
// </div>
// <p className="font-body-md text-body-md text-on-surface-variant">
//                             Deep-dive sessions providing practical tools for navigating anxiety, fostering resilience, and engaging in difficult conversations.
//                         </p>
// </div>
// {/*  Card 3  */}
// <div className="bg-tertiary-fixed p-10 rounded-lg flex flex-col gap-6 justify-between border border-stone-grey/20">
// <div>
// <span className="material-symbols-outlined text-tertiary mb-4 text-3xl">nature_people</span>
// <h3 className="font-headline-md text-headline-md text-on-tertiary-fixed mb-2">Youth Programmes</h3>
// </div>
// <p className="font-body-md text-body-md text-on-tertiary-fixed-variant">
//                             Tailored spaces for young people to develop emotional vocabulary and safe coping mechanisms in a pressured world.
//                         </p>
// </div>
// {/*  Card 4 (Filler for grid balance)  */}
// <div className="bg-surface-container-lowest p-10 rounded-lg flex flex-col gap-6 md:col-span-2 border border-stone-grey/20 justify-center items-center text-center">
// <p className="font-quote-intense text-quote-intense text-secondary max-w-lg">
//                             "The deepest form of care is offering someone the vocabulary to articulate their own experience."
//                         </p>
// </div>
// </div>
// </div>
// </section>
// {/*  Who We Work With  */}
// <section className="w-full max-w-[1440px] px-margin-mobile md:px-margin-desktop py-pause-lg flex flex-col items-center">
// <h2 className="font-headline-lg text-headline-lg text-primary mb-12">Who We Work With</h2>
// <div className="flex flex-wrap justify-center gap-4 max-w-3xl">
// <div className="px-6 py-3 rounded-full bg-surface-container-high text-stone-grey font-label-md text-label-md border border-outline-variant/30">
//                     Non-Governmental Organisations
//                 </div>
// <div className="px-6 py-3 rounded-full bg-surface-container-high text-stone-grey font-label-md text-label-md border border-outline-variant/30">
//                     Women's Advocacy Groups
//                 </div>
// <div className="px-6 py-3 rounded-full bg-surface-container-high text-stone-grey font-label-md text-label-md border border-outline-variant/30">
//                     Educational Institutions
//                 </div>
// <div className="px-6 py-3 rounded-full bg-surface-container-high text-stone-grey font-label-md text-label-md border border-outline-variant/30">
//                     Community Support Centers
//                 </div>
// <div className="px-6 py-3 rounded-full bg-surface-container-high text-stone-grey font-label-md text-label-md border border-outline-variant/30">
//                     Corporate Wellness Initiatives
//                 </div>
// </div>
// </section>
// {/*  Partnership CTA  */}
// <section className="w-full px-margin-mobile md:px-margin-desktop py-pause-xl bg-secondary-fixed flex flex-col items-center text-center">
// <div className="max-w-2xl">
// <span className="material-symbols-outlined text-on-secondary-fixed-variant mb-6 text-4xl">handshake</span>
// <h2 className="font-display-lg text-display-lg text-on-secondary-fixed mb-6">Let's build a quieter space, together.</h2>
// <p className="font-body-lg text-body-lg text-on-secondary-fixed-variant mb-10">
//                     If your organisation aligns with our mission to make emotional literacy accessible and compassionate, we would be honoured to start a conversation.
//                 </p>
// <button className="bg-soft-teal text-white font-label-md text-label-md px-8 py-4 rounded-lg hover:bg-primary transition-colors duration-300">
//                     Explore a Partnership
//                 </button>
// </div>
// </section>
// </main>
// {/*  Footer  */}
// <footer className="bg-surface-container-low dark:bg-inverse-surface full-width transition-all duration-300">
// <div className="w-full px-margin-desktop py-pause-lg flex flex-col md:flex-row justify-between items-center gap-pause-md bg-surface-container-low dark:bg-inverse-surface flat no shadows">
// <div className="h-12"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9XRkBEyQRo9fm8k45Mf2cOxnwQgbu9yy3zuTGNQhLYRZMFTV0ZafmBwxmkBIuXOn7VefcE9W7S8TKmQBWCNjjmW0Y8UM6STM7yKERVsukuKjdXA9KVzGdAWvuQpMf9OkYzuHWZv2DWg9XCcb85G2s-WHzaoHfEZ3HxkeRy9sQY9ibD3Nf2ZUaNZKm8Oqrcs5J2GWiWbvuDBDqjtfUFnHgkQrbt5CaJ-b3c61TADl3NU_jey-Pf463-Dcj2k1msAwuTw" alt="Adore Life Logo" className="h-full w-auto object-contain" /></div>
// <div className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface text-center md:text-left">
//                 © Adore Life. Because everyone deserves to be understood.
//             </div>
// <ul className="flex gap-6">
// <li className=""><a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Privacy</a></li>
// <li className=""><a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Terms</a></li>
// <li className=""><a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Support</a></li>
// </ul>
// </div>
// </footer>

// </>
//   );
// }
