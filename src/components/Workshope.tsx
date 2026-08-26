export default function Workshope() {
  return (
    <>

{/*  Watermark Backgrounds  */}
<div className="watermark top-0 right-0 -translate-y-1/4 translate-x-1/4">N</div>
<div className="watermark top-[40%] left-0 -translate-y-1/2 -translate-x-1/4">A</div>
<div className="watermark bottom-0 right-0 translate-y-1/4 translate-x-1/4">L</div>
{/*  TopNavBar  */}
<nav className="fixed top-0 w-full z-50 transition-opacity duration-500 ease-in-out glass-nav flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto flat no shadows border-none py-4">
<div className="h-16 flex items-center"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKkg1Nf0XAr6sYmoRO8svsZNvBZw7EnfG_ZEeXcWwt9YH_s0MY8k3Qeat_E43vSSor_ZFkza_4KIF94902ucml_LlNuUDw7nUoZBeCNT_f6KQ9ss7F4KxjqrCMkQzWds64lut1D5pL39uEUM2aOcaAkxaUH1LdaO_fVL0MbAoeXeB2RU-_iAt2HjxU6IYxPS7kkvWsRyn_Nzu4YGiXiM7jtcPaLrKq_I2vh3TbbCxTnTAE_MaSr6YyhW1XJqhctB9jFg" alt="Adore Life Logo" className="h-16 w-auto object-contain" /></div>
{/*  Desktop Nav  */}
<div className="hidden md:flex gap-8 items-center"><a className="font-label-md text-label-md font-light uppercase tracking-wider text-on-surface-variant hover:text-soft-teal transition-colors duration-300" href="#">Home</a><a className="font-label-md text-label-md font-light uppercase tracking-wider text-on-surface-variant hover:text-soft-teal transition-colors duration-300" href="#">Story</a><a className="font-label-md text-label-md font-light uppercase tracking-wider text-on-surface-variant hover:text-soft-teal transition-colors duration-300" href="#">Therapy</a><a className="font-label-md text-label-md font-light uppercase tracking-wider text-primary border-b border-soft-teal pb-1" href="#">Conversation</a></div>
<button className="hidden md:inline-flex items-center justify-center font-label-md text-label-md text-white bg-soft-teal hover:bg-primary-container px-8 py-2 rounded-full transition-colors duration-300 uppercase tracking-wider">Begin</button>
{/*  Mobile Menu Toggle  */}
<button className="md:hidden text-primary">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 0"}}>menu</span>
</button>
</nav>
<main className="pt-pause-xl">
{/*  Hero Section  */}
<section className="px-margin-mobile md:px-margin-desktop py-pause-lg max-w-[1440px] mx-auto text-center md:text-left">
<div className="max-w-[800px] mx-auto md:mx-0">
<h1 className="font-display-lg text-display-lg text-primary mb-6 text-balance">
                    Conversations that help us understand ourselves—and each other.
                </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
                    Bringing the insights of clinical psychology into practical, everyday contexts for teams, communities, and individuals.
                </p>
<div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
<button className="inline-flex items-center justify-center font-label-md text-label-md text-on-primary bg-soft-teal hover:bg-primary-container px-8 py-3 rounded-lg transition-colors duration-300">
                        Enquire About a Programme
                    </button>
<button className="inline-flex items-center justify-center font-label-md text-label-md text-primary border border-stone-grey hover:bg-surface-container-low px-8 py-3 rounded-lg transition-colors duration-300">
                        View Formats
                    </button>
</div>
</div>
<div className="mt-16 w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden relative">
<div className="bg-cover bg-center w-full h-full" data-alt="A warm, well-lit modern conference room or workshop space. People are gathered around small tables, engaged in thoughtful conversation. The atmosphere is inviting and collaborative, not corporate. Soft natural light streams in through large windows. The overall aesthetic is editorial, high-fidelity, and emotionally safe, reflecting the Adore Life brand palette of warm ivory and sage green." style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuD58c8ugdJjlfNdwguwbXu8Te06JIDXGhkCKXkuqUR7Nc-_2z7uoFnW9C-DL-95U8JTMeygsW1W953UcrEUNRjgdzKSI2ZIqT3N5X1TVRUAlrgXhbstZ5r76oEsHrVkQMaewzwhFJRYrCCi6waDxztkVo8Yen0l4Vi3KxDqsatIPoTvj2ItirQfl7l8H5tnRg-B-m2Wrn9A87MN2jLLsu9_gG0gLJ8I-4XcebdTlFl2S3Brr-tsYHlE')"}}></div>
</div>
</section>
{/*  Why Workshops Section  */}
<section className="bg-surface-container-low py-pause-xl">
<div className="px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto">
<div className="max-w-[800px] mx-auto text-center">
<span className="font-label-md text-label-md text-sage-green uppercase tracking-wider block mb-4">The Principle</span>
<h2 className="font-headline-lg text-headline-lg text-primary mb-8">Making Psychology Practical</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mb-8 text-balance">
                        Therapy is deeply personal, but many of the tools for emotional wellbeing can be learned and shared in community. Workshops and webinars bridge the gap between clinical insight and everyday application, creating spaces where groups can explore complex themes safely and constructively.
                    </p>
</div>
</div>
</section>
</main>
{/*  Footer  */}
<footer className="w-full px-margin-mobile md:px-margin-desktop py-pause-lg flex flex-col md:flex-row justify-between items-center gap-pause-md bg-surface-container-low dark:bg-inverse-surface flat no shadows transition-all duration-300 mt-pause-xl">
<div className="flex gap-6 items-center">
<a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Privacy</a>
<a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Terms</a>
<a className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-soft-teal dark:hover:text-primary-fixed transition-colors" href="#">Support</a>
</div>
<div className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface text-center md:text-right">
            © Adore Life. Because everyone deserves to be understood.
        </div>
</footer>

</>
  );
}
