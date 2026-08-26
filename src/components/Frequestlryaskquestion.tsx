// export default function Frequestlryaskquestion() {
//     return (
//         <>

//             {/*  TopNavBar  */}
//             <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-500 hidden md:block" id="main-nav">
//                 <div className="flex justify-between items-center w-full px-margin-desktop py-6 max-w-[1440px] mx-auto">
//                     <a className="tracking-tight text-primary dark:text-primary-fixed" href="#"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoFN25OSfSFQ9pdbreA-XUEDDGsurArSRrxFIT4iZ0seGp5t4XLWGxSxib8FvZw6mdHtgUUQhlhsqoFcxphdDh0PlMC_mb4avmXKuSCkATLCMRzLI-6Cw0T9NfJOhwl4q2J92uAiG7gVqc9u1CumprY6-MffhF2_nPyZen5qof8r2Gl6zLw5_gGVbLnKs6_SA6Tz5dXwW6jwyMhKEqZFhDbpccbp2xBEg9DlpQBBM4qxJOAulKOU8eS2OzOPl1Qs08Qw" alt="Adore Life Logo" className="h-[64px] w-auto object-contain" /></a>
//                     <nav className="flex gap-8">
//                         <a className="font-body-md text-label-md uppercase tracking-[0.2em] font-light text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#">Home</a>
//                         <a className="font-body-md text-label-md uppercase tracking-[0.2em] font-light text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#">Story</a>
//                         <a className="font-body-md text-label-md uppercase tracking-[0.2em] font-light text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#">Therapy</a>
//                         <a className="font-body-md text-label-md uppercase tracking-[0.2em] font-light text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors duration-300" href="#">Conversation</a>
//                     </nav>
//                     <a className="font-body-md text-label-md bg-soft-teal text-white px-8 py-2 rounded-full hover:bg-primary transition-colors duration-300" href="#">
//                         Begin
//                     </a>
//                 </div>
//             </header>
//             {/*  Mobile Nav (Simplified)  */}
//             <header className="bg-surface/90 backdrop-blur-md sticky top-0 z-50 md:hidden px-margin-mobile py-4 flex justify-between items-center border-b border-surface-variant">
//                 <a className="tracking-tight text-primary" href="#"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCl89mgTpMaV6RMvyj63jBhu_PpIlPDtBh0BTWw8KKf4lWY5_I2mON8uTMTNIQ4ce3J6mJy4-G6WWloUwhI3mrnD9xf9NCLYRQbl82Tx6QNpQTVMz_4i-IBHxj98NGlY6DD-iT9OsnMbW0erwWBteUyT_laK0A8_nGtvR27hHhEmhPJo7RXkV8qtb7KGium0rxKvMZg5mFoI5cZ3PKOuWAdsGGuYyz5clZSq_2sYFNoiwwjJs8_B5rfGSXUOWtYO8a3g" alt="Adore Life Logo" className="h-[48px] w-auto object-contain" /></a>
//                 <button className="text-primary p-2">
//                     <span className="material-symbols-outlined" data-icon="menu">menu</span>
//                 </button>
//             </header>
//             {/*  Main Canvas  */}
//             <main className="flex-grow flex flex-col items-center w-full">
//                 {/*  Hero Section  */}
//                 <section className="w-full max-w-[800px] px-margin-mobile md:px-0 mx-auto mt-pause-lg mb-pause-md text-center">
//                     <h1 className="font-display-lg text-display-lg text-primary mb-6">
//                         You may have questions.<br />
//                         <span className="text-stone-grey italic">That's completely okay.</span>
//                     </h1>
//                     <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
//                         Exploring therapy is a significant step. We've gathered some common questions to help bring clarity and peace of mind as you consider beginning this process.
//                     </p>
//                 </section>
//                 {/*  Search Bar  */}
//                 <section className="w-full max-w-[600px] px-margin-mobile md:px-0 mx-auto mb-pause-lg">
//                     <div className="relative group">
//                         <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-grey group-focus-within:text-soft-teal transition-colors" data-icon="search">search</span>
//                         <input className="w-full bg-surface-container border-0 border-b border-stone-grey px-12 py-4 focus:ring-0 focus:border-soft-teal transition-colors font-body-md text-body-md text-on-surface placeholder-stone-grey bg-transparent" placeholder="Search for answers..." type="text" />
//                     </div>
//                 </section>
//                 {/*  FAQ Categories  */}
//                 <section className="w-full max-w-[800px] px-margin-mobile md:px-0 mx-auto mb-pause-xl flex flex-col gap-pause-md">
//                     {/*  Category: About Therapy  */}
//                     <div className="faq-category">
//                         <h2 className="font-headline-lg text-headline-lg text-primary mb-8 border-b border-surface-variant pb-4">About Therapy</h2>
//                         <div className="flex flex-col gap-4">
//                             <div className="accordion-item bg-surface-container-low rounded-lg p-6 cursor-pointer border border-transparent hover:border-surface-variant transition-colors">
//                                 <div className="flex justify-between items-center">
//                                     <h3 className="font-headline-md text-headline-md text-on-surface">What exactly is therapy?</h3>
//                                     <span className="material-symbols-outlined accordion-icon text-stone-grey" data-icon="keyboard_arrow_down">keyboard_arrow_down</span>
//                                 </div>
//                                 <div className="accordion-content font-body-md text-body-md text-on-surface-variant">
//                                     Therapy is a collaborative process between you and a trained professional aimed at helping you navigate life's challenges, understand your feelings, and develop healthier coping mechanisms. It provides a safe, confidential space for self-exploration and growth.
//                                 </div>
//                             </div>
//                             <div className="accordion-item bg-surface-container-low rounded-lg p-6 cursor-pointer border border-transparent hover:border-surface-variant transition-colors">
//                                 <div className="flex justify-between items-center">
//                                     <h3 className="font-headline-md text-headline-md text-on-surface">How do I know if I need therapy?</h3>
//                                     <span className="material-symbols-outlined accordion-icon text-stone-grey" data-icon="keyboard_arrow_down">keyboard_arrow_down</span>
//                                 </div>
//                                 <div className="accordion-content font-body-md text-body-md text-on-surface-variant">
//                                     If you find yourself feeling overwhelmed, experiencing prolonged sadness, struggling with relationships, or unable to cope with daily life, therapy can be beneficial. It's also helpful for those seeking personal growth or a deeper understanding of themselves.
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {/*  Category: Starting Therapy  */}
//                     <div className="faq-category">
//                         <h2 className="font-headline-lg text-headline-lg text-primary mb-8 border-b border-surface-variant pb-4">Starting Therapy</h2>
//                         <div className="flex flex-col gap-4">
//                             <div className="accordion-item bg-surface-container-low rounded-lg p-6 cursor-pointer border border-transparent hover:border-surface-variant transition-colors">
//                                 <div className="flex justify-between items-center">
//                                     <h3 className="font-headline-md text-headline-md text-on-surface">What should I expect in the first session?</h3>
//                                     <span className="material-symbols-outlined accordion-icon text-stone-grey" data-icon="keyboard_arrow_down">keyboard_arrow_down</span>
//                                 </div>
//                                 <div className="accordion-content font-body-md text-body-md text-on-surface-variant">
//                                     The first session is primarily about getting to know each other. Your therapist will ask questions about your history, current concerns, and goals for therapy. It's also an opportunity for you to ask questions and see if you feel comfortable with their approach.
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {/*  Visual Pause Image  */}
//                     <div className="w-full my-pause-sm">
//                         <div className="bg-cover bg-center w-full h-[400px] rounded-xl" data-alt="A soft, natural light photograph of an empty, comfortable armchair in a tranquil room, symbolizing an open invitation for conversation. The scene is bathed in warm, diffuse sunlight filtering through sheer curtains. The color palette features muted sand, soft sage, and warm ivory tones. The aesthetic is serene, editorial, and deeply reassuring." style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB3ytqBAxWGzp11JosVSuFq2vUEAdrUuWOwfNpe_jbDySGeZ8gnz9IctkVpXcd9hQAhA84OEEzUXs7Qcs14fad0sf3cGr51o595e-V7gstVJ3wO3LAr0dYCMV19fKSBhKlW5Krj0HVug7KhWdQYiGiG48yzkL6n5M1Ri9xdS2_oJTh06xCDOMmjcVfQM2UJSlOWpftbjmkWSqO0DjZCIVhCb5ZXDUlE96PEwFzYIQZ730cI6Ix--0gy')" }}></div>
//                     </div>
//                     {/*  Category: The Therapeutic Relationship  */}
//                     <div className="faq-category">
//                         <h2 className="font-headline-lg text-headline-lg text-primary mb-8 border-b border-surface-variant pb-4">The Therapeutic Relationship</h2>
//                         <div className="flex flex-col gap-4">
//                             <div className="accordion-item bg-surface-container-low rounded-lg p-6 cursor-pointer border border-transparent hover:border-surface-variant transition-colors">
//                                 <div className="flex justify-between items-center">
//                                     <h3 className="font-headline-md text-headline-md text-on-surface">What if I don't click with my therapist?</h3>
//                                     <span className="material-symbols-outlined accordion-icon text-stone-grey" data-icon="keyboard_arrow_down">keyboard_arrow_down</span>
//                                 </div>
//                                 <div className="accordion-content font-body-md text-body-md text-on-surface-variant">
//                                     It is completely normal and okay if you don't feel a connection with your first therapist. The therapeutic relationship is crucial to the process. We encourage open communication about this; you are always welcome to request a change, and we will support you in finding the right fit.
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {/*  Category: Practical Questions  */}
//                     <div className="faq-category">
//                         <h2 className="font-headline-lg text-headline-lg text-primary mb-8 border-b border-surface-variant pb-4">Practical Questions</h2>
//                         <div className="flex flex-col gap-4">
//                             <div className="accordion-item bg-surface-container-low rounded-lg p-6 cursor-pointer border border-transparent hover:border-surface-variant transition-colors">
//                                 <div className="flex justify-between items-center">
//                                     <h3 className="font-headline-md text-headline-md text-on-surface">What are your fees and do you accept insurance?</h3>
//                                     <span className="material-symbols-outlined accordion-icon text-stone-grey" data-icon="keyboard_arrow_down">keyboard_arrow_down</span>
//                                 </div>
//                                 <div className="accordion-content font-body-md text-body-md text-on-surface-variant">
//                                     Our standard fee is $150 per session. We are an out-of-network provider, which means we do not bill insurance directly. However, we can provide you with a 'superbill' that you can submit to your insurance company for potential reimbursement, depending on your plan's out-of-network benefits.
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//                 {/*  CTA Section  */}
//                 <section className="w-full bg-surface-container-high py-pause-lg px-margin-mobile md:px-margin-desktop text-center">
//                     <div className="max-w-[600px] mx-auto">
//                         <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Still seeking clarity?</h2>
//                         <p className="font-body-md text-body-md text-on-surface-variant mb-8">
//                             If your question isn't answered here, we invite you to reach out directly. We are here to help you feel completely comfortable before beginning.
//                         </p>
//                         <a className="inline-block font-label-md text-label-md bg-transparent border border-soft-teal text-soft-teal px-8 py-3 rounded-lg hover:bg-soft-teal hover:text-white transition-colors duration-300" href="#">
//                             Ask a Question
//                         </a>
//                     </div>
//                 </section>
//             </main>
//             {/*  Footer  */}
//             {/* <footer className="bg-surface-container-low dark:bg-inverse-surface w-full px-margin-desktop py-pause-lg flex flex-col md:flex-row justify-between items-center gap-pause-md mt-auto">
// <div className="font-headline-md text-headline-md text-primary dark:text-primary-fixed">
//             Adore Life
//         </div>
// <div className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface text-center md:text-left">
//             © Adore Life. Because everyone deserves to be understood.
//         </div>
// <div className="flex gap-6">
// <a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Privacy</a>
// <a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Terms</a>
// <a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Support</a>
// </div>
// </footer> */}

//         </>
//     );
// }
